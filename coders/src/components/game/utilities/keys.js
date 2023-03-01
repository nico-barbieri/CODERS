export const keys = {
    left:  {
        pressed: false,
    },
    right:  {
        pressed: false,
    },
    up:  {
        pressed: false,
    },
    down:  {
        pressed: false,
    },
    shift: {
        pressed: false,
    }
}

export const setPressed = key => {
    keys[key].pressed = true;
}

export const unsetPressed = key => {
    keys[key].pressed = false;
}