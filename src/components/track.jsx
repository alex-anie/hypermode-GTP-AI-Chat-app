import {useQuery, gql} from '@apollo/client';
const TRACKS = gql `
query ExampleQuery {
  trackForHome {
    id
    title
    author {
      id
      name
      photo
    }
    thumbnail
    length
    modulesCount
  }
}
`

const Track = ()=> {
    const {loading, error, data } = useQuery(TRACKS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || !data.trackForHome) {
    return <div>No data available</div>;
  }

    return(
        <div>
            {/* {JSON.stringify(data)} */}
            {data.trackForHome.map((track) => (
        <div key={track.id} className='card'>
          <img src={track.author.photo} alt={track.title}/>
          <h3>{track.title}</h3>
          <p>Author: {track.author.name}</p>
          <p>Thumbnail: {track.thumbnail}</p>
          <img src={track.thumbnail} alt={track.title}/>
          <p>Length: {track.length} minutes</p>
          <p>Modules: {track.modulesCount}</p>
        </div>
      ))}
        </div>
    )
}

export default Track;