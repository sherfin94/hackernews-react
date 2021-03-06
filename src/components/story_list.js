import React, {Component} from 'react'
import {create} from 'apisauce'
import Story from './story'

const storiesApi = create({
  baseURL: 'https://hacker-news.firebaseio.com/v0'
})

class StoryList extends Component {

  constructor (props) {
    super(props);

    this.state = {
      stories: [],
      storyCount: 0,
      choice: ''
    }
  }

  componentDidMount() {
    const choice = this.props.choice;
    this.getStories(choice);
  }

  componentWillUpdate() {
    const choice = this.props.choice;
    this.getStories(choice);
  }


  getStories(choice) {
    const limit = 10;
    storiesApi.get(`/${choice}stories.json`)
    .then(response => {
      this.setState({stories: response.data.slice(0,limit), storyCount: response.data.length, choice: choice})
    })
    .catch(error => console.log(error))
  }

  render () {
    const stories = this.state.stories;
    return (
      <div>
        {stories ? (
          <ul>
            {
              stories.map((story) => {
                return (
                  <Story story={story} key={story} />
                )
              })
            }
          </ul>
        ) : (
          <div>Loading...</div>
        )
        }
      </div>
    )
  }

}

export default StoryList
