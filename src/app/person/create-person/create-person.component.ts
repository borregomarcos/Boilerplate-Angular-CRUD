



import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { PersonService, CreatePersonDto} from '@shared/service-proxies/person.service';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html'
})
export class CreatePersonComponent extends AppComponentBase implements OnInit {

    @ViewChild('createPersonModal') modal: ModalDirective;
    @ViewChild('modalContent') modalContent: ElementRef;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active: boolean = false;
    saving: boolean = false;
    person: CreatePersonDto = null;

    constructor(
        injector: Injector,
        private _personService: PersonService,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        
    }

    show(): void {
        this.active = true;
        this.modal.show();
        this.person = new CreatePersonDto();
        //this.user.init({ isActive: true });
    }

    onShown(): void {
        $.AdminBSB.input.activate($(this.modalContent.nativeElement));
    }

    save(): void {
        
        this.saving = true;
        console.log(this.person);
        
        this._personService.create(this.person)
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