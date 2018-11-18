import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { PersonService, PersonDto } from '@shared/service-proxies/person.service';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-edit-person',
    templateUrl: './edit-person.component.html'
})
export class EditPersonComponent extends AppComponentBase {

    @ViewChild('editPersonModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active: boolean = false;
    saving: boolean = false;

    person: PersonDto = null;
    view: boolean;
    constructor(
        injector: Injector,
        private _personService: PersonService
    ) {
        super(injector);
    }


    

    show(id: number, show: boolean): void {
        this.view=show;
            this._personService.get(id)
            .subscribe(
            (result) => {
                this.person = result;
                this.active = true;
                this.view=show;
                this.modal.show();  
            }
            );
        
            
    }
    //-----
//-----------------
    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {
        /*var roles = [];
        $(this.modalContent.nativeElement).find("[name=role]").each(function (ind: number, elem: Element) {
            if ($(elem).is(":checked")) {
                roles.push(elem.getAttribute("value").valueOf());
            }
        });

        this.user.roleNames = roles;*/

        this.saving = true;
        this._personService.update(this.person)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
