import {
    STICKER_CLEAR_SELECTION_EVENT,
    STICKER_EDIT_MODE_CHANGE_EVENT,
    STICKER_RESET_EVENT,
    STICKER_SELECT_EVENT,
} from "./events";

const ACTIVE_SHADOW_CLASSES = ["drop-shadow-xl", "drop-shadow-zinc-900/20"];
const RESIZE_HIT_RADIUS = 14;
const ROTATE_HIT_RADIUS = 34;
const MIN_SCALE = 0.45;
const MAX_SCALE = 3;

const toDeg = (radians: number) => (radians * 180) / Math.PI;

const normalizeDegrees = (value: number) => {
    let angle = value % 360;
    if (angle > 180) angle -= 360;
    if (angle < -180) angle += 360;
    return angle;
};

type StickerWindow = Window & {
    __stickerEditModeEnabled?: boolean;
    __stickerOutsidePointerListenerAdded?: boolean;
    __stickerZIndexCounter?: number;
};

export function initStickerInteractions(root: ParentNode = document) {
    const stickerWindow = globalThis as StickerWindow;

    if (typeof stickerWindow.__stickerZIndexCounter !== "number") {
        stickerWindow.__stickerZIndexCounter = 10000;
    }

    if (typeof stickerWindow.__stickerEditModeEnabled !== "boolean") {
        stickerWindow.__stickerEditModeEnabled = false;
    }

    if (!stickerWindow.__stickerOutsidePointerListenerAdded) {
        document.addEventListener("pointerdown", (event) => {
            const target = event.target;
            if (!(target instanceof Element)) return;
            if (target.closest('[data-sticker="true"]')) return;
            globalThis.dispatchEvent(new CustomEvent(STICKER_CLEAR_SELECTION_EVENT));
        });
        stickerWindow.__stickerOutsidePointerListenerAdded = true;
    }

    root.querySelectorAll<HTMLElement>('[data-sticker="true"]').forEach((wrapper) => {
        if (wrapper.dataset.stickerInitialized === "true") return;

        const inner = wrapper.querySelector<HTMLElement>("[data-sticker-inner]");
        const outline = wrapper.querySelector<HTMLElement>("[data-sticker-outline]");

        if (!inner || !outline) return;

        wrapper.dataset.stickerInitialized = "true";

        type Mode = "drag" | "resize" | "rotate";
        type Corner = {
            x: number;
            y: number;
            resizeCursor: string;
        };

        let offsetX = 0;
        let offsetY = 0;
        let scale = 1;
        let rotation = 0;

        let startX = 0;
        let startY = 0;
        let startScale = 1;
        let startRotation = 0;
        let startDistance = 0;
        let startAngle = 0;

        let activePointerId: number | null = null;
        let activeMode: Mode | null = null;
        let isHovered = false;
        let isSelected = false;
        let isInteracting = false;

        const isEditModeEnabled = () => stickerWindow.__stickerEditModeEnabled === true;

        const syncEditModeState = () => {
            wrapper.dataset.stickerEditMode = isEditModeEnabled() ? "true" : "false";
            wrapper.dataset.stickerInteracting = isInteracting ? "true" : "false";
        };

        const updateOutlineVisibility = () => {
            outline.style.opacity =
                isEditModeEnabled() && (isHovered || isSelected || isInteracting)
                    ? "1"
                    : "0";
        };

        const setActiveVisual = (active: boolean) => {
            isInteracting = active;
            syncEditModeState();
            updateOutlineVisibility();
            if (active) {
                inner.classList.add(...ACTIVE_SHADOW_CLASSES);
            } else {
                inner.classList.remove(...ACTIVE_SHADOW_CLASSES);
            }
        };

        const setWrapperCursor = (cursor: string) => {
            wrapper.style.cursor = cursor;
        };

        const resetInteractionState = () => {
            isInteracting = false;
            activeMode = null;

            if (activePointerId !== null && wrapper.hasPointerCapture(activePointerId)) {
                wrapper.releasePointerCapture(activePointerId);
            }

            activePointerId = null;
            wrapper.classList.add("transition-transform");
            inner.classList.add("transition-transform");
            outline.classList.add("transition-transform");
            inner.classList.remove(...ACTIVE_SHADOW_CLASSES);

            globalThis.removeEventListener("pointermove", onPointerMove);
            globalThis.removeEventListener("pointerup", stopDragging);
            globalThis.removeEventListener("pointercancel", stopDragging);

            syncEditModeState();
            setWrapperCursor(isEditModeEnabled() ? "grab" : "default");
            updateOutlineVisibility();
        };

        const bringToFront = () => {
            stickerWindow.__stickerZIndexCounter =
                (stickerWindow.__stickerZIndexCounter ?? 10000) + 1;
            wrapper.style.zIndex = String(stickerWindow.__stickerZIndexCounter);
        };

        const getCorners = (rect: DOMRect): Corner[] => [
            { x: rect.left, y: rect.top, resizeCursor: "nwse-resize" },
            { x: rect.right, y: rect.top, resizeCursor: "nesw-resize" },
            { x: rect.right, y: rect.bottom, resizeCursor: "nwse-resize" },
            { x: rect.left, y: rect.bottom, resizeCursor: "nesw-resize" },
        ];

        const getNearestCorner = (event: PointerEvent) => {
            const rect = wrapper.getBoundingClientRect();
            const corners = getCorners(rect);

            let nearest = corners[0];
            let minDistance = Number.POSITIVE_INFINITY;

            for (const corner of corners) {
                const distance = Math.hypot(
                    event.clientX - corner.x,
                    event.clientY - corner.y,
                );
                if (distance < minDistance) {
                    minDistance = distance;
                    nearest = corner;
                }
            }

            return { nearest, minDistance, rect };
        };

        const getModeForEvent = (event: PointerEvent): Mode => {
            const { minDistance } = getNearestCorner(event);
            if (minDistance <= RESIZE_HIT_RADIUS) return "resize";
            if (minDistance <= ROTATE_HIT_RADIUS) return "rotate";
            return "drag";
        };

        const updatePosition = () => {
            wrapper.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
        };

        const updateInnerTransform = () => {
            const transform = `rotate(${rotation}deg) scale(${scale})`;
            inner.style.transform = transform;
            outline.style.transform = transform;
        };

        const setHoverCursor = (event: PointerEvent) => {
            if (!isEditModeEnabled()) {
                setWrapperCursor("default");
                return;
            }
            if (activePointerId !== null) return;
            const { nearest, minDistance } = getNearestCorner(event);
            if (minDistance <= RESIZE_HIT_RADIUS) {
                setWrapperCursor(nearest.resizeCursor);
                return;
            }
            if (minDistance <= ROTATE_HIT_RADIUS) {
                setWrapperCursor("crosshair");
                return;
            }
            setWrapperCursor("grab");
        };

        const onPointerMove = (event: PointerEvent) => {
            if (event.pointerId !== activePointerId) return;

            if (activeMode === "drag") {
                offsetX += event.clientX - startX;
                offsetY += event.clientY - startY;
                startX = event.clientX;
                startY = event.clientY;
                updatePosition();
                return;
            }

            const rect = wrapper.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            if (activeMode === "resize") {
                const currentDistance = Math.hypot(
                    event.clientX - centerX,
                    event.clientY - centerY,
                );
                if (startDistance > 0) {
                    scale = Math.min(
                        MAX_SCALE,
                        Math.max(
                            MIN_SCALE,
                            startScale * (currentDistance / startDistance),
                        ),
                    );
                    updateInnerTransform();
                }
                return;
            }

            if (activeMode === "rotate") {
                const currentAngle = toDeg(
                    Math.atan2(event.clientY - centerY, event.clientX - centerX),
                );
                const delta = currentAngle - startAngle;
                rotation = normalizeDegrees(startRotation + delta);
                updateInnerTransform();
            }
        };

        const stopDragging = (event: PointerEvent) => {
            if (event.pointerId !== activePointerId) return;
            setActiveVisual(false);
            resetInteractionState();
        };

        wrapper.addEventListener("pointerdown", (event) => {
            if (!isEditModeEnabled()) return;
            if (activePointerId !== null) return;

            bringToFront();

            activeMode = getModeForEvent(event);
            activePointerId = event.pointerId;
            startX = event.clientX;
            startY = event.clientY;

            const rect = wrapper.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            startScale = scale;
            startRotation = rotation;
            startDistance = Math.hypot(
                event.clientX - centerX,
                event.clientY - centerY,
            );
            startAngle = toDeg(
                Math.atan2(event.clientY - centerY, event.clientX - centerX),
            );

            globalThis.dispatchEvent(
                new CustomEvent<HTMLElement>(STICKER_SELECT_EVENT, {
                    detail: wrapper,
                }),
            );

            setActiveVisual(true);
            let nextCursor = "crosshair";
            if (activeMode === "drag") {
                nextCursor = "grabbing";
            } else if (activeMode === "resize") {
                nextCursor = getNearestCorner(event).nearest.resizeCursor;
            }
            setWrapperCursor(nextCursor);

            wrapper.classList.remove("transition-transform");
            inner.classList.remove("transition-transform");
            outline.classList.remove("transition-transform");
            wrapper.setPointerCapture(event.pointerId);
            globalThis.addEventListener("pointermove", onPointerMove);
            globalThis.addEventListener("pointerup", stopDragging);
            globalThis.addEventListener("pointercancel", stopDragging);
        });

        wrapper.addEventListener("pointerenter", () => {
            isHovered = true;
            updateOutlineVisibility();
        });

        wrapper.addEventListener("pointermove", setHoverCursor);
        wrapper.addEventListener("pointerleave", () => {
            isHovered = false;
            updateOutlineVisibility();
            if (activePointerId === null) setWrapperCursor("grab");
        });

        globalThis.addEventListener(STICKER_SELECT_EVENT, (event) => {
            const customEvent = event as CustomEvent<HTMLElement>;
            isSelected = customEvent.detail === wrapper;
            updateOutlineVisibility();
        });

        globalThis.addEventListener(STICKER_CLEAR_SELECTION_EVENT, () => {
            isSelected = false;
            updateOutlineVisibility();
        });

        globalThis.addEventListener(STICKER_RESET_EVENT, () => {
            offsetX = 0;
            offsetY = 0;
            scale = 1;
            rotation = 0;
            isSelected = false;
            isHovered = false;
            setActiveVisual(false);
            resetInteractionState();
            updateInnerTransform();
            updatePosition();
        });

        globalThis.addEventListener(STICKER_EDIT_MODE_CHANGE_EVENT, (event) => {
            const customEvent = event as CustomEvent<{ enabled: boolean }>;
            stickerWindow.__stickerEditModeEnabled = customEvent.detail.enabled;

            if (!customEvent.detail.enabled) {
                isSelected = false;
                isHovered = false;
                setActiveVisual(false);
                resetInteractionState();
                return;
            }

            syncEditModeState();
            setWrapperCursor("grab");
            updateOutlineVisibility();
        });

        syncEditModeState();
        setWrapperCursor(isEditModeEnabled() ? "grab" : "default");
        updateOutlineVisibility();
        updateInnerTransform();
    });
}