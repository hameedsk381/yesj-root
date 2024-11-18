export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '576px', // Extra small devices (phones, less than 576px)
        'mantine-breakpoint-sm': '768px', // Small devices (phones, 576px and up)
        'mantine-breakpoint-md': '992px', // Medium devices (tablets, 768px and up)
        'mantine-breakpoint-lg': '1200px', // Large devices (desktops, 992px and up)
        'mantine-breakpoint-xl': '1400px', // Extra large devices (large desktops, 1200px and up)
      },
    },
  },
};
