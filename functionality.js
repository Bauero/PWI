var visMenu = false;

    window.onresize = zamknijMenu;

    function zamknijMenu() {
        var menuList = document.querySelector('.menu-list');
        if (window.innerWidth > 1000)
        {
            visMenu = false;
            menuList.style.display = 'none';
        }
    }

    function pokazMenuLista() {
        var menuList = document.querySelector('.menu-list');
        if (!visMenu) {
            menuList.style.display = 'block';
        } else {
            menuList.style.display = 'none';
        }
        visMenu = !visMenu;
    }


    function wyswietlRower(category) {
        var rowery = document.querySelectorAll('.rower');
        rowery.forEach(function(rower) {
            if (rower.id === category) {
                rower.classList.add('active');
            } else {
                rower.classList.remove('active');
            }
        });
        document.querySelector('.menu-list').style.display = 'none';
        visMenu = false;
    }

    function powrot() {
        var rowery = document.querySelectorAll('.rower');
        rowery.forEach(function(rower) {
            rower.classList.remove('active');
        });
    }