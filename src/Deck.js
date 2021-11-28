import React, {Component} from "react";
import './Deck.css'
import Card from "./Card";
import axios from 'axios'

class Deck extends Component {
    constructor(props){
        super(props)
        this.state = {
            deck: [],
            drawnCards: [],
        }
        this.drawCard = this.drawCard.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }
   async drawCard(){
        try {
            let drawnCard = `https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/`
            const card = await axios.get(drawnCard)
            if(!card.data.success){
                throw new Error('Sorry no cards left')
            } else {
                this.setState(st => ({
                    drawnCards :[...st.drawnCards, {
                        id: card.data.cards[0].code,
                        image: card.data.cards[0].image,
                        name: `${card.data.cards[0].value} of ${card.data.cards[0].suit}`
                    }]
                   }))
            }
        } catch (error) {
            alert(error)
        }
    }
   async handleClick(){

    this.drawCard()
      
    }
   async componentDidMount(){
        const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/')
        this.setState({
            deck: response.data,
        })
    }
    
    render(){
        let cards = this.state.drawnCards.map(c => (
            <Card name = {c.name} image = {c.image} key = {c.id}/>
        ))
        return(
            <div className='Deck'>
                <h1 className="Deck-title">Card Dealer</h1>
                <h2 className="Deck-title subtitle">A little demo made with react</h2>
                <button className='Dick-btn' onClick={this.handleClick}>Draw Card</button>   
                <div className='Cards-container'>
                    {cards}
                </div>
               
            </div>
        )
    }
}

export default Deck