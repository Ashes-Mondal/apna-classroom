import React from 'react'
import Card from '../../common/cards/Card'

const Home = () => {
    return (
        <div className='d-flex flex-wrap'>
            <Card/>
            <Card theme='red' />
            <Card theme='blue' />
            <Card theme='purple' />
            <Card theme='yellow' />
            <Card theme='green' />
            <Card theme='orange' />
        </div>
    )
}

export default Home
