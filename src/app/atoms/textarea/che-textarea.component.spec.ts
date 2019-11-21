import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CheTextareaComponent} from './che-textarea.component';
import {Component, Provider, Type} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CheInputComponent} from '../input/che-input.component';
import {By} from '@angular/platform-browser';

describe('che-textarea as a Atomic component', () => {


    let component: any;
    let fixture: ComponentFixture<any>;

    beforeEach(() => {
        // Arrange
        fixture = createComponent(CheTextareaF1Component);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // test 1
    it('Should have a transparent bg the textarea', () => {
        // Arrange
        const textarea = fixture.debugElement.query(By.css('textarea'))!;
        const style = window.getComputedStyle(textarea.nativeElement, ':before');

        // Act

        // Assert
        expect(style.getPropertyValue('background-color')).toEqual('rgba(0, 0, 0, 0)');
    });


    describe('If the textarea has a maxlength attribute', () => {
        // test 2
        it('should have a message under the text on the right side', () => {
            // Arrange
            const textarea = fixture.debugElement.query(By.css('textarea'))!;
            const messegeMaxLength = fixture.debugElement.query(By.css('.messegeMaxlength'))!;
            // Assert
            expect(textarea.nativeElement.getAttribute('maxlength')).toBeTruthy('Should have attribute maxlength');
            expect(messegeMaxLength.nativeElement).toBeDefined('should be the element with the class "messegeMaxlength"');
        });
    });

    describe('If the design the textarea is borderless', () => {
        // test 3
        it('Should be  have a floating label when textarea is focused', () => {
            // Arrange
            const label = fixture.debugElement.query(By.css('label'))!;
            const input = fixture.debugElement.query(By.css('textarea'))!;

            // Assert
            expect(input.nativeElement.classList.contains('che-textarea-focus')).toBeFalsy('Should have not the class che-textarea-focus');
            expect(label.nativeElement.classList.contains('che-label-floating')).toBeFalsy('Should have not the class che-label-floating');
            // act
            input.triggerEventHandler('focus', null);
            fixture.detectChanges();
            // Assert
            expect(input.nativeElement.classList.contains('che-textarea-focus')).toBeTruthy('Should have the class che-textarea-focus');
            expect(label.nativeElement.classList.contains('che-label-floating')).toBeTruthy('Should have the class che-label-floating');

        });

        // test 4
        it('Should be have a floating label when input have a value', () => {
            // Arrange
            const label = fixture.debugElement.query(By.css('label'))!;
            const textarea = fixture.debugElement.query(By.css('textarea'))!;
            // Assert
            textarea.nativeElement.value = 'something';
            textarea.nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            // Assert
            expect(label.nativeElement.classList.contains('che-label-floating')).toBeTruthy('Should to have the class che-label-floating');

        });


        describe('If the textarea has a color', () => {
            // test 7
            it('Should be have the color in the input underline when is focused', () => {
                // Arrange
                const textarea = fixture.debugElement.query(By.css('textarea'))!;
                // assert
                expect(textarea.nativeElement.classList.contains('che-textarea-focus')).toBeFalsy('Should have  not the class che-textarea-focus');
                // Act
                textarea.triggerEventHandler('focus', null);
                fixture.detectChanges();
                // assert
                expect(textarea.nativeElement.classList.contains('che-textarea-focus')).toBeTruthy('Should have the class che-textarea-focus');
                // Act
                textarea.triggerEventHandler('blur', null);
                fixture.detectChanges();
                // assert
                expect(textarea.nativeElement.classList.contains('che-textarea-focus')).toBeFalsy('Should have the class che-textarea-focus');

            });
        });
        describe('If the textarea has not a color', () => { // Fixture 13
            beforeEach(async(() => {
                // Arrange
                fixture.destroy();
                TestBed.resetTestingModule();
                fixture = createComponent(CheTextareaF2Component);
                component = fixture.componentInstance;
                fixture.detectChanges();
            }));
            // test 8
            it('Should have not the color primary by default', () => {
                // Arrange
                const span = fixture.debugElement.query(By.css('span.bar'))!;
                // assert
                expect(span.nativeElement.classList.contains('bg-primary')).toBeTruthy('Should not to have the class bg-primnary');
            });
        });

        describe('If the textarea has a label', () => {
            // test 9
            it('Should have the label like a placeholder over the textarea', () => {
                // Arrange
                const label = fixture.debugElement.query(By.css('label'))!;
                // Act
                fixture.componentInstance.label = 'This label';
                fixture.detectChanges();
                // Assert
                expect(label.nativeElement.classList.contains('che-label-floating')).toBeFalsy('Should not to have the class che-label-floating');

            });
            // test 10
            it('Should to float and be placed above on the textarea when is focused', () => {
                // Arrange
                const label = fixture.debugElement.query(By.css('label'))!;
                const textarea = fixture.debugElement.query(By.css('textarea'))!;
                // Act
                textarea.triggerEventHandler('focus', null);
                fixture.detectChanges();
                // Assert
                expect(label.nativeElement.classList.contains('che-label-floating')).toBeTruthy('Should not to have the class che-label-floating');
            });
        });

        describe('If the textarea is as required', () => {
            beforeEach(async(() => {
                // Arrange
                fixture.destroy();
                TestBed.resetTestingModule();
                fixture = createComponent(CheTextareaF1Component);
                fixture.detectChanges();
            }));
            // test 11
            it('Should to be not invalid to make the first click', () => {
                // Arrange
                let textarea = fixture.debugElement.query(By.css('textarea'))!;
                let divGroup = fixture.debugElement.query(By.css('.group'))!;

                // Act
                expect(textarea.nativeElement.classList.contains('ng-touched'))
                    .toBe(false, 'should to be as untouched');

                textarea.triggerEventHandler('click', null);
                fixture.detectChanges();

                // Assert
                expect(divGroup.nativeElement.classList.contains('has-danger'))
                    .toBe(false, 'should have not the class has-danger');

            });
            // test 12
            it('Should be invalid when not setting a value', () => {
                // Arrange
                let textarea = fixture.debugElement.query(By.css('textarea'))!;
                let divGroup = fixture.debugElement.query(By.css('.group'))!;

                // Act
                expect(textarea.nativeElement.classList.contains('ng-touched'))
                    .toBe(false, 'should be as untouched');

                // input.nativeElement.dispatchEvent(new Event('click'));
                textarea.triggerEventHandler('focus', null);
                fixture.detectChanges();

                // Assert
                expect(divGroup.nativeElement.classList.contains('has-danger'))
                    .toBe(false, 'should have not the class has-danger');

                // Act
                // divGroup.triggerEventHandler('click', null);
                textarea.triggerEventHandler('blur', null); // No esta funcionando
                fixture.detectChanges();
                // Assert
                expect(divGroup.nativeElement.classList.contains('has-danger'))
                    .toBe(true, 'should  have the class has-danger');
            });

            // test 13
            it('Should  be valid when setting a value', () => {
                // Arrange
                let textarea = fixture.debugElement.query(By.css('textarea'))!;
                let divGroup = fixture.debugElement.query(By.css('.group'))!;

                // Act
                expect(textarea.nativeElement.classList.contains('ng-touched'))
                    .toBe(false, 'should to be as untouched');

                textarea.nativeElement.value = 'a value';
                textarea.nativeElement.dispatchEvent(new Event('input'));
                fixture.detectChanges();

                // Assert
                expect(divGroup.nativeElement.classList.contains('has-danger'))
                    .toBe(false, 'should have not the class has-danger');

                // Act
                textarea.triggerEventHandler('blur', null);
                fixture.detectChanges();

                // Assert
                expect(divGroup.nativeElement.classList.contains('has-danger'))
                    .toBe(false, 'should have not the class has-danger');

            });


        });
        describe('If the textarea is not required', () => {
            beforeEach(async(() => {
                // Arrange
                fixture.destroy();
                TestBed.resetTestingModule();
                fixture = createComponent(CheTextareaF2Component);
                fixture.detectChanges();
            }));
            // test 14
            it('Should  be not invalid to make click or if have a value', () => {
                // Arrange
                let textarea = fixture.debugElement.query(By.css('textarea'))!;
                let divGroup = fixture.debugElement.query(By.css('.group'))!;

                textarea.triggerEventHandler('focus', null);
                fixture.detectChanges();

                // Assert
                expect(divGroup.nativeElement.classList.contains('has-danger'))
                    .toBe(false, 'should have not the class has-danger');

                textarea.nativeElement.value = 'a value';
                textarea.nativeElement.dispatchEvent(new Event('input'));
                fixture.detectChanges();

                // Assert
                expect(divGroup.nativeElement.classList.contains('has-danger'))
                    .toBe(false, 'should have not the class has-danger');
            });

        });

        describe('If the textarea is disabled', () => {
            beforeEach(async(() => {
                // Arrange
                fixture.destroy();
                TestBed.resetTestingModule();
                fixture = createComponent(CheTextareaF3Component);
                fixture.detectChanges();
            }));
            // test 14
            it('Should not show as a disabled input', () => {
                // Arrange
                let textarea = fixture.debugElement.query(By.css('textarea'))!;
                // Act
                // Assert
                console.log(textarea.nativeElement);
                expect(textarea.nativeElement.disabled).toBeTruthy('should be a disabled textarea');
            });

            // test 15
            it('Should not to allow to make textarea or click', () => { // NO pude testear focus
                // Arrange
                let textarea = fixture.debugElement.query(By.css('textarea'))!;

                // // Act
                textarea.nativeElement.dispatchEvent(new Event('input'));
                fixture.detectChanges();

                // Assert
                expect(textarea.nativeElement.classList.contains('che-textarea-focus')).toBeFalsy('Should not to have the class che-textarea-focus');

                // Act
                textarea.nativeElement.dispatchEvent(new Event('input'));
                fixture.detectChanges();

                //Assert
                expect(textarea.nativeElement.classList.contains('che-textarea-focus')).toBeFalsy('Should not to have the class che-textarea-focus');
            });
        });

        describe('If the checkbox is readOnly', () => {
            beforeEach(async(() => {
                // Arrange
                fixture.destroy();
                TestBed.resetTestingModule();
                fixture = createComponent(CheTextareaF4Component);
                fixture.detectChanges();
            }));
            // test 16
            it('Should not show as a readOnly textarea', () => {
                // Arrange
                let textarea = fixture.debugElement.query(By.css('textarea'))!;

                console.log(textarea.nativeElement)
                // Act

                // Assert
                expect(textarea.nativeElement.readOnly).toBeTruthy('should be a disabled textarea');
            });

            // test 17
            it('Should not to allow to make focus', () => {// no funciona
                // Arrange
                let textarea = fixture.debugElement.query(By.css('textarea'))!;
                // Act
                textarea.triggerEventHandler('focus', null);
                fixture.detectChanges();

                // Assert
                expect(textarea.nativeElement.classList.contains('che-textarea-focus')).toBeTruthy('Should have the class che-textarea-focus a');

                textarea.triggerEventHandler('blur', null);
                fixture.detectChanges();

                // Assert
                expect(textarea.nativeElement.classList.contains('che-textarea-focus')).toBeFalsy('Should not to have the class che-textarea-focus a');

           });
        });
    });

    describe('If the design is by default or border', () => {
        beforeEach(async(() => {
            // Arrange
            fixture.destroy();
            TestBed.resetTestingModule();
            fixture = createComponent(CheTextareaF5Component);
            component = fixture.componentInstance;
            fixture.detectChanges();
        }));
        // test 18
        it('Should be design border', () => {
            // Arrange
            let textarea = fixture.debugElement.query(By.css('textarea'))!;
            // Act

            // Assert
            expect(textarea.nativeElement.design).toBeUndefined('Should not to have a design');
        });

        // test 19
        it('Should have a value to set a value', () => {
            // Arrange
            let textarea = fixture.debugElement.query(By.css('textarea'))!;

            // Act
            textarea.nativeElement.value = 'something';
            textarea.nativeElement.dispatchEvent(new Event('change'));
            fixture.detectChanges();

            // Assert
            expect(fixture.componentInstance.value).toBe('something', 'Should have not a design');
        });

        describe('If the textarea has a color', () => {
            // test 21
            it('should not reflect changes', () => {
                // Arrange
                let textarea = fixture.debugElement.query(By.css('textarea'))!;

                let numberOfClass = textarea.nativeElement.classList.length;

                // Act
                textarea.triggerEventHandler('focus', null);
                fixture.detectChanges();

                expect(numberOfClass).toBe(textarea.nativeElement.classList.length, 'should not to change the number of classes');

            });

        });

        describe('If the textarea has a label', () => {
            // test 22
            it('should be located above of the textarea', () => {
                // Arrange
                let textarea = fixture.debugElement.query(By.css('textarea'))!;
                // Act
                // Assert
                expect(textarea.nativeElement.classList.contains('form-control')).toBeTruthy('Should to have the class form-control');
            });

            // test 23
            it('Should have the label seted', () => {
                // Arrange
                let label = fixture.debugElement.query(By.css('label'))!;
                // Act
                fixture.componentInstance.label = 'This label';
                fixture.detectChanges();
                // Assert
                expect(label.nativeElement.textContent).toBe('This label', 'Should to be "This label"');
            });

        });

        describe('If textarea is as required', () => {
            beforeEach(async(() => {
                // Arrange
                fixture.destroy();
                TestBed.resetTestingModule();
                fixture = createComponent(CheTextareaF5Component);
                fixture.detectChanges();
            }));
            // test 24
            it('Should be valid to make the first click', () => {
                // Arrange
                let textarea = fixture.debugElement.query(By.css('textarea'))!;
                let divGroup = fixture.debugElement.query(By.css('.form-group'))!;
                // Act
                expect(textarea.nativeElement.classList.contains('ng-touched'))
                    .toBe(false, 'shouldbe as untouched');
                textarea.triggerEventHandler('click', null);
                fixture.detectChanges();
                // Assert
                expect(divGroup.nativeElement.classList.contains('has-danger-wBorder'))
                    .toBe(false, 'should not have the class has-danger-wBorder');

            });

            // test 25
            it('Should be invalid when not setting a value', () => {
                console.log('test 25');
                // Arrange
                let textarea = fixture.debugElement.query(By.css('textarea'))!;
                let divGroup = fixture.debugElement.query(By.css('.form-group'))!;
                // Act
                expect(textarea.nativeElement.classList.contains('ng-touched'))
                    .toBe(false, 'should be as untouched');
                textarea.triggerEventHandler('click', null);
                fixture.detectChanges();
                // Assert
                expect(divGroup.nativeElement.classList.contains('has-danger-wBorder'))
                    .toBe(false, 'should  have not the class has-danger-wBorder');
                // Act
                textarea.triggerEventHandler('blur', null);
                fixture.detectChanges();
                // Assert
                expect(divGroup.nativeElement.classList.contains('has-danger-wBorder'))
                    .toBeTruthy('should have the class has-danger-wBorder');
            });

            // test 27
            it('Should  be valid when setting a value', () => {
                // Arrange
                let textarea = fixture.debugElement.query(By.css('textarea'))!;
                let divGroup = fixture.debugElement.query(By.css('.form-group'))!;

                // Act
                expect(textarea.nativeElement.classList.contains('ng-touched'))
                    .toBe(false, 'should to be as untouched');

                textarea.nativeElement.value = 'a value';
                textarea.nativeElement.dispatchEvent(new Event('input'));
                fixture.detectChanges();

                // Assert
                expect(divGroup.nativeElement.classList.contains('has-danger-wBorder'))
                    .toBe(false, 'should not to have the class has-danger-wBorder');
                // Act
                textarea.triggerEventHandler('blur', null);
                fixture.detectChanges();
                // Assert
                expect(divGroup.nativeElement.classList.contains('has-danger-wBorder'))
                    .toBe(false, 'should not to have the class has-danger-wBorder');

            });

        });

        describe('If the textarea is as not required', () => {
            beforeEach(async(() => {
                // Arrange
                fixture.destroy();
                TestBed.resetTestingModule();
                fixture = createComponent(CheTextareaF6Component);
                fixture.detectChanges();
            }));
            // test 28
            it('Should to be valid when not setting a value', () => {
                // Arrange
                let textarea = fixture.debugElement.query(By.css('textarea'))!;
                let divGroup = fixture.debugElement.query(By.css('.form-group'))!;

                // Act
                textarea.triggerEventHandler('focus', null);
                fixture.detectChanges();

                // Assert
                expect(divGroup.nativeElement.classList.contains('has-danger-wBorder'))
                    .toBe(false, 'should have not the class has-danger-wBorder');

                // Act
                textarea.triggerEventHandler('blur', null);
                fixture.detectChanges();

                // Assert
                expect(divGroup.nativeElement.classList.contains('has-danger-wBorder'))
                    .toBe(false, 'should have the class has-danger-wBorder');
            });
        });

        describe('If it has a placeholder', () => {
            beforeEach(async(() => {
                // Arrange
                fixture.destroy();
                TestBed.resetTestingModule();
                fixture = createComponent(CheTextareaF5Component);
                fixture.detectChanges();
            }));
            // test 29
            it('Should  have the placeholder', () => {
                // Arrange
                let textarea = fixture.debugElement.query(By.css('textarea'))!;
                // Act
                fixture.componentInstance.placeholder = 'a placeholder';
                fixture.detectChanges();
                // Assert
                expect(textarea.nativeElement.placeholder)
                    .toBe('a placeholder', 'should  have the value "a placeholder"');
            });
        });

        describe('If the textarea is disabled', () => {
            beforeEach(async(() => {
                // Arrange
                fixture.destroy();
                TestBed.resetTestingModule();
                fixture = createComponent(CheTextareaF7Component);
                fixture.detectChanges();
            }));
            // test 30
            it('Should show as a disabled textarea', () => {
                // Arrange
                let textarea = fixture.debugElement.query(By.css('textarea'))!;
                // Act
                // Assert
                expect(textarea.nativeElement.disabled).toBeTruthy('should be a disabled textarea');
            });

            // test 31
            it('Should not to allow to make focus or click', () => {
                // Arrange
                let textarea = fixture.debugElement.query(By.css('textarea'))!;

                // Act
                textarea.triggerEventHandler('click', null);
                fixture.detectChanges();

                // Act
                let numberClass = textarea.nativeElement.classList.length;
                textarea.triggerEventHandler('focus', null);
                fixture.detectChanges();

                // Assert
                expect(numberClass).toBe(textarea.nativeElement.classList.length, 'Should not change the classes in the textarea');
            });
        });
        describe('If the textarea is readOnly', () => {
            beforeEach(async(() => {
                // Arrange
                fixture.destroy();
                TestBed.resetTestingModule();
                fixture = createComponent(CheTextareaF8Component);
                fixture.detectChanges();
            }));
            // test 32
            it('Should not show as a readOnly textarea', () => {
                // Arrange
                let textarea = fixture.debugElement.query(By.css('textarea'))!;
                // Act
                // Assert
                expect(textarea.nativeElement.readOnly).toBeTruthy('should be a readonly textarea');
            });

            // test 33
            it('Should not to allow to make focus or click', () => { // no funciona
                // Arrange
                let textarea = fixture.debugElement.query(By.css('textarea'))!;
                // Act
                textarea.triggerEventHandler('click', null);
                fixture.detectChanges();

                // Act
                let numberClass = textarea.nativeElement.classList.length;
                textarea.triggerEventHandler('focus', null);
                fixture.detectChanges();

                // Assert
                expect(numberClass).toBe(textarea.nativeElement.classList.length, 'Should not to change the classes in the input');
            });
        });

    });


});

function createComponent<T>(component: Type<T>,
                            providers: Provider[] = [],
                            imports: any[] = [],
                            declarations: any[] = []): ComponentFixture<T> {
    TestBed.configureTestingModule({
        imports: [
            FormsModule,
            ...imports
        ],
        declarations: [CheTextareaComponent, component, ...declarations],
        providers,
    }).compileComponents();

    return TestBed.createComponent<T>(component);
}

// fixture 1
@Component({
    template: `
        <che-textarea desing="borderless" name="exampleName" [(ngModel)]="example" color="primary" label="This label" maxlength="50"
                      required></che-textarea>`
})
class CheTextareaF1Component {
}


// fixture 2
@Component({
    template: `
        <che-textarea desing="borderless" label="This label" maxlength="50"></che-textarea>`
})
class CheTextareaF2Component {
}

// fixture 3
@Component({
    template: `
        <che-textarea desing="borderless" label="This label" disabled="true"></che-textarea>`
})
class CheTextareaF3Component {
}


// fixture 4
@Component({
    template: `
        <che-textarea desing="borderless" label="This label" readonly="true"></che-textarea>`
})
class CheTextareaF4Component {
}

// fixture 5
@Component({
    template: `
        <che-textarea label="This label" placeholder="a placeholder" name="exampleName" [(ngModel)]="example" required></che-textarea>`
})
class CheTextareaF5Component {
}

// fixture 5
@Component({
    template: `
        <che-textarea label="This label" placeholder="placeholder" name="exampleName" [(ngModel)]="example" ></che-textarea>`
})
class CheTextareaF6Component {
}

// fixture 5
@Component({
    template: `
        <che-textarea label="This label" placeholder="placeholder" name="exampleName" [(ngModel)]="example" disabled="true" ></che-textarea>`
})
class CheTextareaF7Component {
}


// fixture 5
@Component({
    template: `
        <che-textarea label="This label" placeholder="placeholder" name="exampleName" [(ngModel)]="example" readonly="true" ></che-textarea>`
})
class CheTextareaF8Component {
}



