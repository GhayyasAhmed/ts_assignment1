type Product = {
    id: number;
    title: string;
    price: number;
    brand: string;
    category: string;
  }


  async function fetchProducts(): Promise<Product[]> {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data)
    return data.products as Product[];
  }

  class ProductTable {
    table: HTMLTableElement;
    private thead: HTMLTableSectionElement;
    private tbody: HTMLTableSectionElement;
    constructor() {
      this.table = document.createElement('table');
      this.table.classList.add('table', 'table-striped', 'table-hover');
      this.thead = document.createElement('thead');
      this.tbody = document.createElement('tbody');
      this.table.appendChild(this.thead);
      this.table.appendChild(this.tbody);
    }

    async loadProducts() {
      document.body.appendChild(this.table);
      const products = await fetchProducts();
      const headers = ['Id', 'Name', 'Price', 'Brand', 'Category'];
      const headerRow = document.createElement('tr');
      for (const header of headers) {
        const headerCell = document.createElement('th');
        headerCell.textContent = header;
        headerRow.appendChild(headerCell);
      }
      this.thead.appendChild(headerRow);
      for (const product of products) {
        const row = document.createElement('tr');
        const idCell = document.createElement('td');
        idCell.textContent = product.id.toString();
        const nameCell = document.createElement('td');
        nameCell.textContent = product.title;
        const priceCell = document.createElement('td');
        priceCell.textContent = product.price.toString();
        const brandCell = document.createElement('td');
        brandCell.textContent = product.brand;
        const categoryCell = document.createElement('td');
        categoryCell.textContent = product.category;

        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(brandCell);
        row.appendChild(categoryCell);
        this.tbody.appendChild(row);
      }
    }

  }