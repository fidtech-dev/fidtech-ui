import {Component, OnInit, Input, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, NgModel} from '@angular/forms';


const noop = () => {
};

@Component({
    selector: 'fiu-checkbox',
    templateUrl: './fiu-checkbox.component.html',
    styleUrls: ['./fiu-checkbox.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FiuCheckboxComponent),
            multi: true
        }
    ],
})

export class FiuCheckboxComponent implements ControlValueAccessor {
    @Input() color = '';
    @Input() label = '';
    @Input() disabled;

    /**
     * @description The internal data model
     */
    private innerValue: any = '';


    /**
     * @description Placeholders for the callbacks which are later providesd by the Control Value Accessor
     */
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;


    /**
     * @description get accessor
     */
    get value(): any {
        return this.innerValue;
    };

    /**
     * @description set accessor including call the onchange callback
     */
    set value(v: any) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.onChangeCallback(v);
        }
    }

    /**
     * @description Set touched on blur
     */
    onBlur() {
        this.onTouchedCallback();
    }
    /**
     * @description From ControlValueAccessor interface
     */
    writeValue(value: any) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }


    /**
     * @description From ControlValueAccessor interface
     */
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

}
