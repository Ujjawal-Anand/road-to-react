import React from 'react';
import logo from './logo.svg';
import './App.css';

const useSemiPeristenceState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useSemiPeristenceState(
    'search',
    'React'
  )
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  const searchedStories = stories.filter(story => 
      story.title.toLowerCase().includes(searchTerm.toLowerCase())
      );


  return (
    <div className="App">
      <h1> My Hacker Stories</h1>

      <InputWithLable
        id="Search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLable>
      <hr />
      <list list={searchedStories} />
    </div>
  );
}

const InputWithLable = ({
  id,
  value,
  type='text',
  onInputChange,
  children,
}) => (
  <> 
    <lable htmlFor={id}>{children}</lable>
    &nbsp;
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
  </>
);

const List = ({ list  }) => 
  list.map(item => <Item key={item.objectID} item={item} />)

const Item = ({ item  }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </div>
)

export default App;
