function initialize() {
    const menuItems = document.querySelectorAll('.menu__item');
    const sections = document.querySelectorAll('.section');
    const downloadButton = document.querySelector('.panel__button');
  
    function debounce(func, wait) {
      let timeout;
      return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
      };
    }
  
    if (menuItems.length > 0) {
      menuItems.forEach(item => {
        item.addEventListener('click', debounce(() => {
          menuItems.forEach(menu => menu.classList.remove('menu__item--active'));
          item.classList.add('menu__item--active');
  
          const target = item.getAttribute('data-target');
          sections.forEach(section => {
            section.classList.toggle('section--active', section.id === target);
          });
        }, 200));
      });
    }
  
    function adjustForMobile() {
      const isMobile = window.innerWidth <= 768;
  
      document.querySelectorAll('.panel').forEach(panel => {
        if (isMobile) {
          panel.classList.add('flex', 'gap-small');
          panel.style.flexDirection = 'column';
          panel.style.alignItems = 'flex-start';
        } else {
          panel.classList.remove('flex', 'gap-small');
          panel.style.flexDirection = '';
          panel.style.alignItems = '';
        }
      });
    }
  
    window.addEventListener('resize', debounce(adjustForMobile, 100));
    adjustForMobile();
  
    async function downloadReport() {
        const filename = 'table_data.pdf';
        const activeSection = document.querySelector('.section--active');
        if (!activeSection) return;
    
        const content = activeSection.innerHTML;
        try {
            const opt = {
                margin: 1,
                filename: filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: {
                    unit: 'in', format: 'letter',
                    orientation: 'portrait'
                }
            };
            await html2pdf().set(opt).
                from(content).save();
        } catch (error) {
            console.error('Error:', error.message);
        }
      }
  
    if (downloadButton) {
      downloadButton.addEventListener('click', downloadReport);
    }
  }
  
  document.addEventListener('DOMContentLoaded', initialize);
  