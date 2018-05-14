// import Modal from './Modal.vue'
// import Dialog from './Dialog.vue'
import ModalsContainer from './ModalsContainer.vue'
import Vue from 'vue'


const Plugin = {
	install(Vue, options = {}) {
    
		if (this.installed) {
			return
		}

		this.installed = true
    
    const AppendChild = function( vm, el, component, componentConfig = {} ) {
      const extended = Vue.extend( component )

      componentConfig['parent'] = vm
      const instance = new extended( componentConfig )

      instance.$mount()
      el.appendChild( instance.$el )

      return instance
    }

    class Modal {

      constructor( vm, component ) {
        this.vm = vm
        this.component = component
        this._modalContainerInstance = null
        this._contentComponentInstance = null
        this.isDestroyed = false
        this.isOpen = false
      }

      _createVmChild( target, component, content ) {
        return AppendChild( this.vm, target, component, content )
      }

      _instantiate( contentConfig ) {
        this._modalContainerInstance = this._createVmChild( this.vm.$el, ModalsContainer )
        this._contentComponentInstance = this._createVmChild( this._modalContainerInstance.$refs.content, this.component, contentConfig )
      }

      _setupListeners() {
        this._modalContainerInstance.$on('blank-space-click', () => {
          this.close()
        })

        this._contentComponentInstance.$on('close', () => {
          this.close()
        })
      }

      _destroyInstances() {

        if( this.isDestroyed ) {
          return;
        }

        this.vm.$el.removeChild( this._modalContainerInstance.$el )
        this._contentComponentInstance.$destroy(true)
        this._modalContainerInstance.$destroy(true)
        this.isDestroyed = true
      }

      open( propsData, listeners ) {
        this._instantiate( { propsData, listeners } )
        this._setupListeners()
        this.isOpen = true
      }

      close() {

        if( !this.isOpen ) {
          return;
        }

        console.log( this )

        this._destroyInstances()
      }

    }

    this.event = new Vue()

    Vue.mixin( {

      computed: {
        $modal() {
          return {
            show : ( Component, props, listeners ) => {

              const vm = this;

              const modal = new Modal( vm, Component )
              
              modal.open( props, listeners )
              
              return modal

            }
          }
        }
      }

    } )

	}
}

export default Plugin