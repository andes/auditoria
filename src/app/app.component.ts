import { Plex } from 'andes-plex/src/lib/core/service';
import { Component } from '@angular/core';
import { SidebarItem } from 'andes-plex/src/lib/app/sidebar-item.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(public plex: Plex) { }
    ngOnInit() {
        //Cargo el listado de componentes
        this.loadSideBar();
    }

    loadSideBar() {
        let items = [
        new SidebarItem('Inicio', 'creation', '/inicio'),
        new SidebarItem('Auditorias', 'creation', '/auditoria'),
        new SidebarItem('Duplicados', 'blur', '/duplicado'),
        ];
        this.plex.initStaticItems(items);
    }
}
