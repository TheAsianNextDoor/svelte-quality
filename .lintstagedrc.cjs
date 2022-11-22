module.exports = {
  'src/**/*.{js,ts,jsx,tsx}': [
    'eslint --cache --max-warnings=0 --no-ignore --fix',
    'vitest --watch=false --passWithNoTests',
  ],
  '*/*.{scss,sass,css,html,json,md,yaml,yml}': 'prettier --cache --write',
};
