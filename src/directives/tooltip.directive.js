export default {
  mounted(el, { value }) {
    window.M.Tooltip.init(el, { html: value, position: "top" });
  },
  beforeUnmount(el) {
    const tooltip = window.M.Tooltip.getInstance(el);
    if (tooltip && tooltip.destroy) {
      tooltip.destroy();
    }
  },
};
