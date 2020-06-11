export const validateHEX = (hex: string) => {
    const reg = /^#?[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/;
    return reg.test(hex);
};

export const validateRGB = (props: [number, number, number]) => {
    const [r, g, b] = props;
    const reg = /^\d{1,3}$/;
    return reg.test(String(r)) &&
            reg.test(String(g)) &&
            reg.test(String(b)) &&
            parseInt(String(r), 10) <= 255 &&
            parseInt(String(g), 10) <= 255 &&
            parseInt(String(b), 10) <= 255;
  };

export const validateA = (v: string | number) => {
    const reg = /^\d{1,3}$/;
    return reg.test(String(v)) && parseInt(String(v), 10) <= 100;
};

export const formatHEX = (hex: string) => (
    hex.charAt(0) === '#' ? hex : `#${hex}`
);

export const RGBToHEX = ([r, g, b]: [number, number, number]): string => (
    [
        '#',
        r < 16 ? `0${r.toString(16)}` : r.toString(16),
        g < 16 ? `0${g.toString(16)}` : g.toString(16),
        b < 16 ? `0${b.toString(16)}` : b.toString(16),
    ].join('').toUpperCase()
);

export const HEXToRGB = (hex: string): [number, number, number] => {
    let r: number;
    let g: number;
    let b: number;
    let innerHex = hex;
    if (hex.charAt(0) === '#') {
        innerHex = hex.slice(1);
    }

    if (innerHex.length === 6) {
        r = parseInt(innerHex.substring(0, 2), 16);
        g = parseInt(innerHex.substring(2, 4), 16);
        b = parseInt(innerHex.substring(4), 16);
    } else {
        r = parseInt(innerHex.charAt(0).repeat(2), 16);
        g = parseInt(innerHex.charAt(1).repeat(2), 16);
        b = parseInt(innerHex.charAt(2).repeat(2), 16);
    }

    return [r, g, b];
};
