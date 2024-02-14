import lodash from "lodash";

export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 5,
      pageCount: 0,
      allItems: [],
      items: [],
    };
  },
  methods: {
    setupPagination(allItems) {
      this.allItems = lodash.chunk(allItems, this.pageSize);
      this.pageCount = lodash.size(this.allItems);
      this.items = this.allItems[this.page - 1] || this.allItems[0];
    },
    onChangePage(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
      this.items = this.allItems[page - 1] || this.allItems[0];
    },
  },
};
