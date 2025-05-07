fetch('/menu.json')
  .then(r => r.json())
  .then(d => {
    const l = document.getElementById('menu-left'),
          r = document.getElementById('menu-right'),
          n = document.getElementById('notification');
    let t = l;

    d.forEach(i => {
      let a = (i.Item || '').trim().toLowerCase(),
          p = i.Price || '';

      if (a === 'notify') {
        n.textContent = p;
        return;
      }

      if (a === 'split') {
        t = r;
        return;
      }

      let e = document.createElement('li');
      if (a === 'section') {
        e.textContent = p;
        e.classList.add('section');
      } else {
        e.textContent = `${i.Item} — ${i.Price}`;
      }

      t.appendChild(e);
    });
  })
  .catch(err => console.error('Menu load failed:', err));
