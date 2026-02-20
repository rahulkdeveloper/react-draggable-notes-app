import React, { useEffect, useState } from 'react'

const Pagination = ({currentPage,totalPage,filterNotes}) => {



    const items = Array.from({length:totalPage})

    const handlePagination = (page)=>{
        filterNotes("next",page)
    }

    return (
        <div>
            <nav aria-label="...">
                <ul class="pagination">
                    <li class={`page-item ${currentPage===1?"disabled":""}`}>
                        <button className='page-link'
                        onClick={()=> handlePagination(currentPage-1)}
                        >Previous</button>
                    </li>
                    {items.length>0 && items.map((value,index)=>{
                        return (
                            <li key={index+1} class={`page-item ${currentPage===(index+1)?"active":""}`}><a class="page-link" href="#"
                            onClick={()=> handlePagination(index+1)}
                            >{index+1}</a></li>
                        )
                    })}
                    
                    {/* <li class="page-item active" aria-current="page">
                        <a class="page-link" href="#">2</a>
                    </li> */}
                    {/* <li class="page-item"><a class="page-link" href="#">3</a></li> */}
                    <li class={`page-item ${currentPage===totalPage?"disabled":""}`}>
                         <button className='page-link'
                         onClick={()=>handlePagination(currentPage+1)}
                         >Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination