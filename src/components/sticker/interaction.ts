import {
    STICKER_CLEAR_SELECTION_EVENT,
    STICKER_EDIT_MODE_CHANGE_EVENT,
    STICKER_RESET_EVENT,
    STICKER_SELECT_EVENT,
} from "./events";

const ACTIVE_SHADOW_CLASSES = ["drop-shadow-xl", "drop-shadow-zinc-900/20"];

const getAncestorRotationRadians = (element: HTMLElement) => {
    let angle = 0;
    let current: HTMLElement | null = element.parentElement;

    while (current) {
        const transform = globalThis.getComputedStyle(current).transform;

        if (transform && transform !== "none") {
            try {
                const matrix = new DOMMatrixReadOnly(transform);
                angle += Math.atan2(matrix.b, matrix.a);
            } catch {
                // Ignore malformed transform strings.
            }
        }

        current = current.parentElement;
    }

    return angle;
};

const toLocalAxisDelta = (element: HTMLElement, dx: number, dy: number) => {
    const angle = getAncestorRotationRadians(element);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return {
        dx: dx * cos + dy * sin,
        dy: -dx * sin + dy * cos,
    };
};

type StickerWindow = Window & {
    __stickerEditModeEnabled?: boolean;
    __stickerOutsidePointerListenerAdded?: boolean;
    __stickerZIndexCounter?: number;
};

export function initStickerInteractions(root: ParentNode = document) {
    const stickerWindow = globalThis as unknown as StickerWindow;

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

        let offsetX = 0;
        let offsetY = 0;

        let startX = 0;
        let startY = 0;

        let activePointerId: number | null = null;
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

        const updatePosition = () => {
            wrapper.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
        };

        const setHoverCursor = () => {
            if (!isEditModeEnabled()) {
                setWrapperCursor("default");
                return;
            }
            if (activePointerId !== null) return;
            setWrapperCursor("grab");
        };

        const onPointerMove = (event: PointerEvent) => {
            if (event.pointerId !== activePointerId) return;

            const dx = event.clientX - startX;
            const dy = event.clientY - startY;
            const localDelta = toLocalAxisDelta(wrapper, dx, dy);

            offsetX += localDelta.dx;
            offsetY += localDelta.dy;
            startX = event.clientX;
            startY = event.clientY;
            updatePosition();
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

            activePointerId = event.pointerId;
            startX = event.clientX;
            startY = event.clientY;

            globalThis.dispatchEvent(
                new CustomEvent<HTMLElement>(STICKER_SELECT_EVENT, {
                    detail: wrapper,
                }),
            );

            setActiveVisual(true);
            setWrapperCursor("grabbing");

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

        wrapper.addEventListener("pointermove", () => setHoverCursor());
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
            isSelected = false;
            isHovered = false;
            setActiveVisual(false);
            resetInteractionState();
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
    });
}