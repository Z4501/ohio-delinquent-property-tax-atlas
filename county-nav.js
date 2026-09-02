(() => {
  const counties = [
    ['adams', 'Adams'], ['allen', 'Allen'], ['ashtabula', 'Ashtabula'], ['ashland', 'Ashland'], ['athens', 'Athens'], ['auglaize', 'Auglaize'],
    ['belmont', 'Belmont'], ['brown', 'Brown'], ['butler', 'Butler'], ['carroll', 'Carroll'], ['champaign', 'Champaign'], ['clark', 'Clark'], ['clermont', 'Clermont'], ['clinton', 'Clinton'], ['columbiana', 'Columbiana'], ['coshocton', 'Coshocton'], ['crawford', 'Crawford'], ['cuyahoga', 'Cuyahoga'],
    ['darke', 'Darke'], ['defiance', 'Defiance'], ['delaware', 'Delaware'], ['erie', 'Erie'], ['fairfield', 'Fairfield'], ['fayette', 'Fayette'], ['franklin', 'Franklin'], ['fulton', 'Fulton'],
    ['gallia', 'Gallia'], ['geauga', 'Geauga'], ['greene', 'Greene'], ['guernsey', 'Guernsey'], ['hancock', 'Hancock'], ['hardin', 'Hardin'], ['harrison', 'Harrison'], ['hamilton', 'Hamilton'], ['henry', 'Henry'], ['highland', 'Highland'],
    ['hocking', 'Hocking'], ['holmes', 'Holmes'], ['huron', 'Huron'], ['jackson', 'Jackson'], ['jefferson', 'Jefferson'], ['knox', 'Knox'], ['lake', 'Lake'], ['licking', 'Licking'], ['lawrence', 'Lawrence'],
    ['logan', 'Logan'], ['lorain', 'Lorain'], ['lucas', 'Lucas'], ['madison', 'Madison'], ['mahoning', 'Mahoning'],
    ['marion', 'Marion'], ['medina', 'Medina'], ['meigs', 'Meigs'], ['mercer', 'Mercer'], ['miami', 'Miami'],
    ['monroe', 'Monroe'], ['morrow', 'Morrow'], ['montgomery', 'Montgomery'], ['morgan', 'Morgan'], ['muskingum', 'Muskingum'], ['noble', 'Noble'], ['ottawa', 'Ottawa'], ['paulding', 'Paulding'], ['perry', 'Perry'], ['pickaway', 'Pickaway'], ['pike', 'Pike'], ['portage', 'Portage'],
    ['preble', 'Preble'], ['putnam', 'Putnam'], ['richland', 'Richland'], ['ross', 'Ross'], ['sandusky', 'Sandusky'], ['scioto', 'Scioto'], ['seneca', 'Seneca'], ['shelby', 'Shelby'],
    ['stark', 'Stark'], ['summit', 'Summit'], ['trumbull', 'Trumbull'], ['tuscarawas', 'Tuscarawas'], ['union', 'Union'], ['van-wert', 'Van Wert'], ['vinton', 'Vinton'], ['warren', 'Warren'], ['washington', 'Washington'], ['wayne', 'Wayne'], ['williams', 'Williams'], ['wood', 'Wood'], ['wyandot', 'Wyandot'],
  ];

  const slug = location.pathname.split('/').filter(Boolean).at(-2);
  const index = counties.findIndex(([value]) => value === slug);
  const actions = document.querySelector('.actions');
  if (index < 0 || !actions || actions.dataset.countyNav === 'ready') return;

  actions.dataset.countyNav = 'ready';
  actions.style.flexWrap = 'wrap';
  const existingOverview = actions.querySelector('a[href="../index.html"]');
  if (existingOverview) existingOverview.remove();

  const countyHref = (county) => county[2] || `../${county[0]}/index.html`;
  const makeLink = (label, href, title) => {
    const link = document.createElement('a');
    link.className = 'btn';
    link.href = href;
    link.textContent = label;
    link.title = title;
    link.style.cssText = 'text-decoration:none;color:inherit;white-space:nowrap';
    return link;
  };

  const previous = counties[(index - 1 + counties.length) % counties.length];
  const next = counties[(index + 1) % counties.length];
  actions.append(
    makeLink('← Previous', countyHref(previous), `${previous[1]} County`),
    makeLink('Ohio overview', '../index.html', 'Return to the Ohio county map'),
    makeLink('Next →', countyHref(next), `${next[1]} County`),
  );

  const sidebar = document.getElementById('sidebar');
  const mobileToggle = document.getElementById('mobileToggle');
  const closeMobilePanel = () => {
    if (innerWidth > 760 || !sidebar?.classList.contains('open')) return;
    sidebar.classList.remove('open');
    if (mobileToggle) mobileToggle.textContent = 'Filters & totals';
    setTimeout(() => window.dispatchEvent(new Event('resize')), 240);
  };
  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-id], #fit')) closeMobilePanel();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMobilePanel();
  });
})();
