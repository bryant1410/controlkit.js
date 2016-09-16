import validateOption from 'validate-option';
import createHtml from '../util/createHtml';

const template =
    `<li class="component">
        <label></label>
        <div class="input-wrap">
        </div>
     </li>`;

export const DefaultConfig = Object.freeze({
    label : 'none',
    labelRatio : null,
    annotation : null
});

export default class Component{
    /**
     * @constructor
     * @param {SubGroup} parent - The parent sub-group
     * @param {*} config - The component configuration
     */
    constructor(parent,config){
        config = validateOption(config,DefaultConfig);

        this._state = {
            label : config.label,
            labelRatio : config.labelRatio,
            annotation : config.annotation
        };

        this._parent = parent;
        this._element = this._parent.elementList.appendChild(createHtml(template));
        this._elementLabel = this._element.querySelector('label');
        this._elementWrap = this._element.querySelector('.input-wrap');

        this.label = this._state.label;
        this.labelRatio = this._state.labelRatio;
    };

    /**
     * Sets the component label. If the value passed is null the label gets
     * removed.
     * @param {String|null} value
     */
    set label(value){
        this._state.label = value;
        if(value === null){
            this._elementLabel.innerText = '';
            this._element.classList.add('hide-label');
            return;
        }
        this._elementLabel.innerText = value === 'none' ? '' : value;
        this._element.classList.remove('hide-label');
    }

    /**
     * Returns the current label.
     * @returns {*}
     */
    get label(){
        return this._state.label;
    }

    /**
     * Sets the label / input width ratio.
     * @param {Number} value
     */
    set labelRatio(value){
        this._state.labelRatio = value;
        if(value == null){
            this._elementLabel.style.width = null;
            this._elementWrap.style.width = null;
        } else{
            const style = this.computedStyle;
            const paddingLeft = parseFloat(style.paddingLeft);
            const paddingRight = parseFloat(style.paddingRight);
            const width = parseFloat(style.width) - paddingLeft - paddingRight;
            this._elementLabel.style.width = width * value - (paddingLeft + paddingRight) * 0.25 + 'px';
            this._elementWrap.style.width = width * (1.0 - value) + 'px';
        }
    }

    /**
     * Returns the label / input width ratio.
     * @returns {Number}
     */
    get labelRatio(){
        return this._state.labelRatio;
    }

    /**
     * Returns the underlying dom element.
     * @returns {HTMLElement}
     */
    get element(){
        return this._element;
    }

    /**
     * Returns the components parent group.
     * @returns {SubGroup}
     */
    get parent(){
        return this._parent;
    }

    /**
     * Sets a annotation to be displayed on hover.
     * @param {String} title - The title of the info annotation.
     * @param {String} text - The annotation body text.
     */
    setAnnotation(title,text){
        const annotation = this._state.annotation || {};
        annotation.title = title;
        annotation.text = text;
    }

    /**
     * Returns a copy of the annotation set.
     * @returns {*}
     */
    getAnnotation(){
        if(!this._state.annotation){
            return null;
        }
        return Object.assign({},this._state.annotation);
    }

    /**
     * Completely clears the component and removes it from its parent element.
     */
    clear(){
        this._element.parentNode.removeChild(this._element);
    }

    get computedStyle(){
        return window.getComputedStyle(this._element);
    }
}