export default {
  beforeMount(el, binding) {
    const iconClass = [];

    if (binding.arg === 'full') {
      iconClass.push(binding.value);
    } else {
      iconClass.push('fa');
      iconClass.push('text-2xl');
      iconClass.push(`fa-${binding.value}`);
    }

    if (binding.modifiers.right) {
      iconClass.push('float-right');
    }

    if (binding.modifiers.yellow) {
      iconClass.push('text-yellow-400');
    } else {
      iconClass.push('text-green-400');
    }

    // eslint-disable-next-line no-param-reassign
    el.innerHTML += `<i class="${iconClass.join(' ')}"></i>`;
  },
};
