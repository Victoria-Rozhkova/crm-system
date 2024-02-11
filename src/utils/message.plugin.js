export default {
  install: function (app) {
    app.config.globalProperties.$message = (text) => {
      return window.M.toast({ html: text });
    };

    app.config.globalProperties.$error = (text) => {
      return window.M.toast({
        html: `Ошибка: ${text}`,
        classes: "toast-error",
      });
    };
  },
};
