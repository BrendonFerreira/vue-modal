import ModalsContainer from './ModalsContainer.vue'

const Plugin = {
	install(Vue, options = {}) {
    
		if (this.installed) {
			return
		}

		this.installed = true
    
    this.event = new Vue()

    const AppendChild = function( vm, el, component, componentConfig = {} ) {
      const extended = Vue.extend( component )

      componentConfig['parent'] = vm
      const instance = new extended( componentConfig )

      instance.$mount()
      el.appendChild( instance.$el )

      return instance
    }

    class Modal {

      
      constructor( vm, component, eventsVM ) {
        this.event = eventsVM
        this._callHook('beforeCreate', this)
        this.vm = vm
        this.component = component
        this._modalContainerInstance = null
        this._contentComponentInstance = null
        this.isDestroyed = false
        this.isOpen = false
        this._callHook('created', this)
      }

      _callHook( hook, data ) {
        this.event.$emit( hook, data )
      }

      get $on () {
        return this.event.$on
      }

      get $off () {
        return this.event.$off
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
        this._callHook('beforeMount', this)
        this._instantiate( { propsData, listeners } )
        this._setupListeners()
        this.isOpen = true
        this._callHook('mounted', this._contentComponentInstance)
      }

      close() {

        const content = this._contentComponentInstance
        this._callHook('beforeDestroy', content)

        if( !this.isOpen ) {
          return;
        }

        this._destroyInstances()
        this._callHook('destroyed', content)
        return content
      }

    }

    Vue.mixin( {

      computed: {
        $modal() {
          return {
            show : ( Component, props, listeners ) => {

              const vm = this;
              const modal = new Modal( vm, Component, Plugin.event )
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