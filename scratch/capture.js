import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const TARGET_URL = 'https://evershine-official.netlify.app/';
const TMP_HTML_PATH = path.resolve('scratch/temp_screenshot.html');
const OUTPUT_PNG_PATH = path.resolve('public/images/works/evershine.png');

async function run() {
  try {
    // 1. Fetch HTML
    console.log('Fetching live HTML from', TARGET_URL);
    const res = await fetch(TARGET_URL);
    let html = await res.text();

    // 2. Rewrite relative URLs in src and href to absolute
    console.log('Rewriting src and href URLs...');
    html = html.replace(/(href|src)="\/([^"\n]+)"/g, (match, p1, p2) => {
      if (p2.startsWith('data:')) return match;
      return `${p1}="https://evershine-official.netlify.app/${p2}"`;
    });

    // 3. Strip or rewrite srcset attribute to prevent loading failures of responsive images
    console.log('Stripping srcset attributes to force fallback to absolute src URLs...');
    html = html.replace(/srcset="[^"]*"/g, '');

    // 4. Inject style block to force visibility of hero elements
    console.log('Injecting styles...');
    const styleBlock = `
      <style>
        #hero-line-1, #hero-line-2, #hero-sub {
          opacity: 1 !important;
          transform: none !important;
          visibility: visible !important;
        }
        #hero-line-accent {
          opacity: 1 !important;
          transform: scaleY(1) !important;
          visibility: visible !important;
        }
        #hero-scroll-indicator {
          opacity: 1 !important;
          visibility: visible !important;
        }
        /* Disable transition animations to avoid half-animated states */
        * {
          transition: none !important;
          animation: none !important;
        }
      </style>
    `;
    html = html.replace('</head>', `${styleBlock}</head>`);

    // Ensure scratch dir exists
    fs.mkdirSync(path.dirname(TMP_HTML_PATH), { recursive: true });

    // Write modified HTML
    fs.writeFileSync(TMP_HTML_PATH, html, 'utf-8');
    console.log('Written temporary HTML to', TMP_HTML_PATH);

    // 5. Capture screenshot using Microsoft Edge (direct execution via execFileSync)
    console.log('Running Edge to capture screenshot...');
    const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
    
    const args = [
      '--headless',
      '--disable-gpu',
      `--screenshot=${OUTPUT_PNG_PATH}`,
      '--window-size=1280,720',
      '--virtual-time-budget=5000', // Allow 5 seconds of virtual time for image rendering
      `file:///${TMP_HTML_PATH}`
    ];
    
    console.log('Arguments:', args);
    
    execFileSync(edgePath, args, { stdio: 'inherit' });
    console.log('Screenshot captured successfully to', OUTPUT_PNG_PATH);

    // Clean up temporary HTML
    if (fs.existsSync(TMP_HTML_PATH)) {
      fs.unlinkSync(TMP_HTML_PATH);
    }
  } catch (error) {
    console.error('Error during capture:', error);
  }
}

run();
