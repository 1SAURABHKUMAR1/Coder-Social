class WhereClause {
    constructor(base, bigQuery) {
        this.base = base;
        this.bigQuery = bigQuery;
    }

    pager(resultperPage) {
        let currentPage = 1;
        if (this.bigQuery.page) currentPage = this.bigQuery.page;

        this.base = this.base
            .limit(resultperPage)
            .skip(resultperPage * (currentPage - 1));
        return this;
    }

    search() {
        const searchWord = this.bigQuery.search
            ? {
                  title: {
                      $regex: this.bigQuery.search,
                      $options: 'i',
                  },
              }
            : {};

        this.base = this.base
            .find({ ...searchWord })
            .populate({
                path: 'tags author',
                select: 'name username name profile_photo',
            })
            .sort({ createdAt: 'descending' });

        return this;
    }
}

module.exports = WhereClause;

// post?search=typescript&page=1
