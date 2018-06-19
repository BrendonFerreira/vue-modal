import ModalsContainer from './ModalsContainer.vue'

const Plugin = {
  install (Vue, options = {}) {

    if (this.installed) {
      return
    }

    this.installed = true

    this.event = new Vue()

    const AppendChild = function (vm, el, component, config = {}) {
      const Extended = Vue.extend(component)

      config['parent'] = vm
      const instance = new Extended(config)

      instance.$mount()
      el.appendChild(instance.$el)

      return instance
    }

    class Modal {

      constructor (vm, component, eventsVM) {
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

      _callHook (hook, data) {
        this.event.$emit(hook, data)
      }

      get $on () {
        return this.event.$on
      }

      get $off () {
        return this.event.$off
      }

      _createVmChild (target, component, content) {
        return AppendChild(this.vm, target, component, content)
      }

      _instantiate (contentConfig) {
        this._modalContainerInstance = this._createVmChild(this.vm.$root.$el, ModalsContainer, contentConfig)
        this._contentComponentInstance = this._createVmChild(this._modalContainerInstance.$refs.content, this.component, contentConfig)
      }

      _setupListeners () {
        this._modalContainerInstance.$on('blank-space-click', () => {
          this.close()
        })

        this._contentComponentInstance.$on('close', () => {
          this.close()
        })
      }

      _destroyInstances () {
        if (this.isDestroyed) {
          return
        }

        this.vm.$root.$el.removeChild(this._modalContainerInstance.$el)
        this._contentComponentInstance.$destroy(true)
        this._modalContainerInstance.$destroy(true)
        this.isDestroyed = true
      }

      open (attributes = {}) {
        this._callHook('beforeMount', this)

        const propsData = attributes
        propsData.config = attributes
        this._instantiate({
          propsData
        })
        this._setupListeners()
        this.isOpen = true
        this._callHook('mounted', this._contentComponentInstance)
      }

      close () {
        const content = this._contentComponentInstance
        this._callHook('beforeDestroy', content)

        if (!this.isOpen) {
          return
        }

        this._destroyInstances()
        this._callHook('destroyed', content)
        return content
      }

    }

    const showComponent = function (Component, attributes = {}) {
      const vm = this
      const modal = new Modal(vm, Component, Plugin.event)
      modal.open(attributes)
      return modal
    }

    Vue.mixin({

      computed: {
        $modal () {
          return {
            show: showComponent.bind(this),
            open: showComponent.bind(this)
          }
        }
      }

    })
  }
}

export default Plugin
