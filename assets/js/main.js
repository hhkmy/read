// Prevent dark mode flash (FART) by setting the class before page render
(function() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (theme === 'light') {
    document.documentElement.classList.remove('dark');
  }
})();

// Night mode toggle logic
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('dark-toggle');
    const html = document.documentElement;
    if (toggle) {
      toggle.addEventListener('click', function() {
        html.classList.toggle('dark');
        if (html.classList.contains('dark')) {
          localStorage.setItem('theme', 'dark');
        } else {
          localStorage.setItem('theme', 'light');
        }
      });
    }
  });
})();
