


import { Component, Injector, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PersonService, PersonDto, PagedResultDtoOfPersonDto } from '@shared/service-proxies/person.service';
import { PagedListingComponentBase, PagedRequestDto } from 'shared/paged-listing-component-base';
import { finalize, sequenceEqual } from 'rxjs/operators';
import { EditPersonComponent } from 'app/person/edit-person/edit-person.component';
import {CreatePersonComponent} from 'app/person/create-person/create-person.component';

@Component({
    templateUrl: './person.component.html',
    animations: [appModuleAnimation()]
})
export class PersonComponent extends PagedListingComponentBase<PersonDto> {

    @ViewChild('createPersonModal') createPersonModal: CreatePersonComponent;
    @ViewChild('editPersonModal') editPersonModal: EditPersonComponent;

    active: boolean = false;
    persons: PersonDto[] = [];
    
    

    constructor(
        injector: Injector,
        private _personService: PersonService
    ) {
        super(injector);
    }

    protected list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        this._personService.getAll(request.skipCount, request.maxResultCount)
            .pipe(finalize(() => {
                 finishedCallback()
            }))
            .subscribe((result: PagedResultDtoOfPersonDto) => {
                this.persons = result.items;
                this.showPaging(result, pageNumber);
            });
            console.log(this.persons);
    }

    protected delete(person: PersonDto): void {
        abp.message.confirm(
            "Delete user '" + person.firstName + "'?",
            (result: boolean) => {
                if (result) {
                    this._personService.delete(person.id)
                        .subscribe(() => {
                            abp.notify.info("Deleted User: " + person.firstName);
                            this.refresh();
                        });
                }
            }
        );
    }

    // Show Modals
    
    createPerson(): void {
        this.createPersonModal.show();
    }

    editPerson(person: PersonDto): void {
        this.editPersonModal.show(person.id, true);
    }

    showOnly(person,):void{
        
        this.editPersonModal.show(person.id, false);
        
    }
}
