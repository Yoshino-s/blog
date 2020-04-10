const getContext = (width: number, height: number) => {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('width', width.toString());
  canvas.setAttribute('height', height.toString());
  const context = canvas.getContext('2d');
  if (!context)
    throw Error('Can\'t get context');
  return context;
}

export const getImageData = (src: string, scale = 1): Promise<Uint8ClampedArray> => {
  const img = new Image()
  if (!src.startsWith('data')) img.crossOrigin = 'Anonymous'

  return new Promise((resolve, reject) => {
    img.onload = function () {
      const width = img.width * scale;
      const height = img.height * scale;
      const context = getContext(width, height);
      context.drawImage(img, 0, 0, width, height);

      const { data } = context.getImageData(0, 0, width, height)
      resolve(data)
    }
    img.src = src
  })
}

export const getCounts = (data: Uint8ClampedArray) => {
  const countMap = new Map<[number, number, number, number], number>();

  for (let i = 0; i < data.length; i += 4 /* 4 gives us r, g, b, and a*/) {
    const alpha: number = data[i + 3]
    // skip FULLY transparent pixels
    if (alpha === 0) continue

    const rgbComponents: (number|undefined)[] = Array.from(data.subarray(i, i + 3))

    // skip undefined data
    if (rgbComponents.indexOf(undefined) !== -1) continue

    const color = [rgbComponents[0], rgbComponents[1], rgbComponents[2], rgbComponents[3] ?? 1] as [number, number, number, number];

    const res = countMap.get(color);
    if (res) {
      countMap.set(color, res + 1);
    } else {
      countMap.set(color, 1);
    }
  }

  const counts = Array.from(countMap.entries());
  return counts.sort((a, b) => b[1] - a[1]);
}


export async function analyze(src: string, scale = 1) {
  if (scale > 1 || scale <= 0) {
    console.warn(`You set scale to ${scale}, which isn't between 0-1. This is either pointless (> 1) or a no-op (≤ 0)`)
  }
  const data = await getImageData(src, scale)
  return getCounts(data)
}

export async function getTheme(src: string, scale = 0.3): Promise<{
  r: number;
  g: number;
  b: number;
  a: number;
  isDark: boolean;
}> {
  const res = (await analyze(src, scale))[0][0];
  const isDark = 0.213 * res[0] + 0.715 * res[1] + 0.072 * res[2] < 255 / 2;
  return {
    r: res[0],
    g: res[1],
    b: res[2],
    a: res[3],
    isDark
  }
}