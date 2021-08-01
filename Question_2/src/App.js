import React, { PureComponent } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './App.css'
    

export class PaginationExample extends PureComponent {

    constructor(props) {
        super(props)
    
        this.state = {
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 6,
            currentPage: 0
        }

        this.handlePageClick = this.handlePageClick.bind(this);

    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
		const data = this.state.orgtableData;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			tableData:slice
		})
	
    }

   componentDidMount(){
        this.getData();
    }
    getData() {
        let page1='https://reqres.in/api/users?page=1'
        let page2='https://reqres.in/api/users?page=2'
        const requestOne = axios.get(page1);
         const requestTwo = axios.get(page2);
         axios.all([requestOne, requestTwo])
            .then(axios.spread((...res) => {
                // var tdata = res.data;
                const responseOne=res[0].data
                const responseTwo=res[1].data
                let tdata=responseOne.data.concat(responseTwo.data)
                console.log('data-->'+JSON.stringify(tdata))
				 var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    pageCount: Math.ceil(tdata.length / this.state.perPage),
                    orgtableData : tdata,
                    tableData:slice
                })
      }));
    }


    render() {
        console.log(this.state.orgtableData)
        return (
            <div>
          <nav class="navbar navbar-expand-sm bg-light justify-content-center">
  <ul class="navbar-nav">
  
    <li class="nav-item">
      <a class="nav-link">UserDetails</a>
    </li>

  </ul>
</nav>
<div className='tabledata' >
                 <table border="1" className='table table-hover'>
                     <thead  className="thead-dark">
                         <th>Id</th>
                         <th>Avatar</th>
                         <th>Name</th>
                         <th>Email</th>
                         
</thead>
                     <tbody>
                        {
                          this.state.tableData.map((tdata, i) => (
                                <tr>
                                    <td>{tdata.id}</td>
                                    <td><img className='image_avatar' src={tdata.avatar}/></td>
                                    <td>{tdata.first_name}</td>
                                    <td>{tdata.email}</td>
                                </tr>
                              ))
                        }
                          </tbody>
                 </table>   

       <div className='pagination'>
           <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                    </div>  
            </div>
        </div>
        )
    }
}

export default PaginationExample
