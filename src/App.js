import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function App() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const recordsPerPage = 10;

  useEffect(() => {
    axios.get('https://pattyweb.com.br/react-api/api.php')
      .then(res => {
        setColumns(Object.keys(res.data[0]));
        setRecords(res.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records
    .filter(record => record.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset pagination to page 1 when searching
  };

  return (
    <div className='container mt-5'>
      <h1 className='mb-2'>Crud React API</h1>
      <div className='text-end'>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="form-control mb-3"
        />
        <Link to="/create" className='btn btn-primary'>Add User</Link>
      </div>
      <table className='table'>
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i}>{c}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>
                <Link to={`/update/${d.id}`} className='btn btn-sm btn-success me-2'>Update</Link>
                <button onClick={() => handleSubmit(d.id)} className='btn btn-sm btn-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        recordsPerPage={recordsPerPage}
        totalRecords={records.length}
        paginate={paginate}
      />
    </div>
  );
}

function handleSubmit(id) {
  const conf = window.confirm("Do you Want to Delete");
  if (conf) {
    axios.delete(`https://pattyweb.com.br/react-api/api.php?id=${id}`)
      .then(res => {
        alert('record deleted');
        window.location.reload();
      }).catch(err => console.log(err))
  }
}

const Pagination = ({ recordsPerPage, totalRecords, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button onClick={() => paginate(number)} className='page-link'>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default App;
