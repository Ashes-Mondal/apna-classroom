import React from 'react'
import Card from '../../common/cards/Card'
import Upload from '../../common/file-upload/Upload'
import './Home.scss'

const Home = () => {
    return (
        <div className="class-grid">
            <Card />
            <Card theme="red" />
            <Card theme="blue" />
            <Card theme="purple" />
            <Card theme="yellow" />
            <Card theme="green" />
            <Card theme="orange" />
            {/* <Upload/> */}
        </div>
    )
}

export default Home
