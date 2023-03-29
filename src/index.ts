// type Country = {
//     name: string;
//     capital: string;
//     currencies: Record<string, any>[];
//     languages: Record<string, any>[];
//     population: number;
//     startOfWeek: string;
//   }
  
//   async function fetchCountries(): Promise<Country[]> {
//     const response = await fetch('https://restcountries.com/v3.1/subregion/Southern%20Asia?fields=name,capital,currencies,languages,population,startOfWeek&sort=name');
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data as Country[];
//   }
  
//   async function renderTable() {
//     const countries = await fetchCountries();
//     const tableBody = document.querySelector('tbody');
//     if (tableBody) {
//       for (const country of countries) {
//         const currencyKey = Object.keys(country.currencies)[0];
//         const languageKey = Object.keys(country.languages)[0];
//         const row = document.createElement('tr');
//         const serialNoCell = document.createElement('td');
//         serialNoCell.textContent = (countries.indexOf(country) + 1).toString();
//         const nameCell = document.createElement('td');
//         nameCell.textContent = country.name.official || country.name?.common;
//         const capitalCell = document.createElement('td');
//         capitalCell.textContent = country.capital?.[0] || 'N/A';
//         const populationCell = document.createElement('td');
//         populationCell.textContent = country.population?.toLocaleString() || 'N/A';
//         const currenciesCell = document.createElement('td');
//         currenciesCell.textContent = country.currencies?.[currencyKey]?.name || 'N/A';
//         const languagesCell = document.createElement('td');
//         languagesCell.textContent = country.languages?.[languageKey] || 'N/A';
//         const startOfWeekCell = document.createElement('td');
//         startOfWeekCell.textContent = country.startOfWeek || 'N/A';
//         row.appendChild(serialNoCell);
//         row.appendChild(nameCell);
//         row.appendChild(capitalCell);
//         row.appendChild(populationCell);
//         row.appendChild(currenciesCell);
//         row.appendChild(languagesCell);
//         row.appendChild(startOfWeekCell);
//         tableBody.appendChild(row);
//       }
//     }
//   }
  
//   // Example usage
//   renderTable();

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