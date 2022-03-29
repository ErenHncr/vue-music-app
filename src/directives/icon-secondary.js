export default {
  beforeMount(el, binding) {
    const iconClass = [];
    iconClass.push('fa');
    iconClass.push('text-2xl');
    iconClass.push('text-green-400');
    iconClass.push(`fa-${binding.value.icon}`);

    if (binding.value.right) {
      iconClass.push('float-right');
    }

    // eslint-disable-next-line no-param-reassign
    el.innerHTML += `<i class="${iconClass.join(' ')}"></i>`;
  },
};
