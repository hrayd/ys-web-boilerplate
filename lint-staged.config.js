module.exports = {
  "src/**/*.{js,jsx,ts,tsx}": ["eslint --fix", "git add"],
  "src/**/*.{js,jsx,tsx,html,css,scss,sass}": ["prettier --write", "git add"],
};
