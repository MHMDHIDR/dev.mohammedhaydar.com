function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: withOpacity("--color-text-base"),
          accent: withOpacity("--color-accent"),
          inverted: withOpacity("--color-fill"),
        },
      },
      backgroundColor: {
        skin: {
          fill: withOpacity("--color-fill"),
          accent: withOpacity("--color-accent"),
          inverted: withOpacity("--color-text-base"),
          card: withOpacity("--color-card"),
          "card-muted": withOpacity("--color-card-muted"),
        },
      },
      outlineColor: {
        skin: {
          fill: withOpacity("--color-accent"),
        },
      },
      borderColor: {
        skin: {
          line: withOpacity("--color-border"),
          fill: withOpacity("--color-text-base"),
          accent: withOpacity("--color-accent"),
        },
      },
      fill: {
        skin: {
          base: withOpacity("--color-text-base"),
          accent: withOpacity("--color-accent"),
        },
        transparent: "transparent",
      },
      typography: {
        DEFAULT: {
          css: {
            pre: {
              color: false,
            },
            code: {
              color: false,
            },
          },
        },
      },
      colors: {
        black: '#000000',
        white: '#ffffff',

        primary: '#2376EB',
        secondary: '#7EB4ff',

        body: '#BFBECB',
        heading: '#FAFAFA',
        placeholder: '#707070',

        border: '#282828',

        grey: {
          darken: '#0B1223',
          DEFAULT: '#0F172A',
          lighten: '#162033'
        }
      },
      fontFamily: {
        mono: ["IBM Plex Mono", "monospace"],
        body: ["'Radio Canada', sans-serif"],
        display: ["'Radio Canada', sans-serif"],
        segoe: ["'Segoe UI', sans-serif"]
      },
      animation: {
        lefttoright: 'titleDeviderAnimation 3s ease-in-out infinite',
        ledgerleftright: 'ledgerLeftRight 3s ease-in-out infinite',
        ledgerrightleft: 'ledgerRightLeft 3s ease-in-out infinite',
        ledgertopbottom: 'ledgerTopBottom 3s ease-in-out infinite',
        ledgerbottomtop: 'ledgerBottomTop 3s ease-in-out infinite',
        slidedown: 'slideDown 1s ease-in-out 1'
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
