import { APIEvent } from "@solidjs/start/server";

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function getFadedColorFromHash(hash: number): string {
  const r = (hash & 0xFF0000) >> 16;
  const g = (hash & 0x00FF00) >> 8;
  const b = hash & 0x0000FF;
  const fadedR = Math.floor(r / 2 + 128); // Fading by averaging with 128
  const fadedG = Math.floor(g / 2 + 128);
  const fadedB = Math.floor(b / 2 + 128);
  return `rgb(${fadedR}, ${fadedG}, ${fadedB})`;  // Output faded RGB color
}

function generateGrid(hash: number): number[][] {
  const gridSize = 16;
  const grid = [];
  for (let i = 0; i < gridSize; i++) {
    const row = [];
    for (let j = 0; j < gridSize; j++) {
      const value = (hash >> (i * gridSize + j)) & 1;
      row.push(value);
    }
    grid.push(row);
  }
  return grid;
}


function generateAvatarSVG(letter: string, grid: number[][], color1: string, color2: string): string {
  const cellSize = 6; // Size of each grid cell
  const gridSize = 16; // 16x16 grid

  let svgGrid = "";
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const fill = grid[y][x] === 1 ? color1 : color2;
      svgGrid += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="${fill}" />`;
    }
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${gridSize * cellSize}" height="${gridSize * cellSize}" viewBox="0 0 ${gridSize * cellSize} ${gridSize * cellSize}">
      <!-- Define a blur filter -->
      <defs>
        <filter id="blur" x="0" y="0" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
      </defs>

      <!-- Apply the grid with the blur effect -->
      <g filter="url(#blur)">
        ${svgGrid}
      </g>

      <!-- Add a transparent black overlay -->
      <rect x="0" y="0" width="${gridSize * cellSize}" height="${gridSize * cellSize}" fill="rgba(0, 0, 0, 0.25)" />

      <!-- Add the centered bold letter without blur -->
      <text x="50%" y="50%" dy=".35em" text-anchor="middle" font-size="35" font-family="Arial" font-weight="bold" fill="white">
        ${letter}
      </text>
    </svg>
  `;
}

export async function GET({ params }: APIEvent) {
  const { username } = params;

  if (!username) {
    return new Response("Username is required", { status: 400 });
  }

  const firstLetter = username.charAt(0).toUpperCase() + username.charAt(1).toUpperCase();
  const hash = hashString(username);

  const grid = generateGrid(hash);
  const color1 = getFadedColorFromHash(hash);
  const color2 = getFadedColorFromHash(~hash);  // second col is just inversed

  const svg = generateAvatarSVG(firstLetter, grid, color1, color2);

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}
