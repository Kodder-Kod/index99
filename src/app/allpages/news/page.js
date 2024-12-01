

const News = () => {



    // Sample data for the news sections
const trendingNews = [
    {
      title: "Tech Innovations of 2024",
      summary: "Discover the groundbreaking tech trends that are reshaping the industry.",
      link: "#"
    },
    {
      title: "Economic Growth in Africa",
      summary: "Exploring the key factors driving economic progress in African nations.",
      link: "#"
    },
    {
      title: "Global Climate Initiatives",
      summary: "How countries are coming together to combat climate change.",
      link: "#"
    }
  ];
  
  const topNews = [
    {
      title: "Stock Market Update",
      summary: "Today's major stock market movements and financial insights.",
      link: "#"
    },
    {
      title: "New Space Mission Launched",
      summary: "A new mission aimed at exploring the outer reaches of our solar system.",
      link: "#"
    },
    {
      title: "Major Sports Event Scheduled",
      summary: "Exciting new developments in the world of sports for the upcoming season.",
      link: "#"
    }
  ];
  
  const breakingNews = [
    {
      title: "Unexpected Earthquake Hits City",
      summary: "A sudden earthquake has impacted the city, causing significant damage.",
      link: "#"
    },
    {
      title: "New Vaccine for Malaria Released",
      summary: "A new malaria vaccine has been approved for distribution in affected regions.",
      link: "#"
    },
    {
      title: "Political Unrest in Capital",
      summary: "Tensions rise as protests erupt in the nation's capital city.",
      link: "#"
    }
  ];
  

    return (

        <div className="bg-gray-100 min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Page Header */}
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Latest News</h1>
      
          {/* News Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Trending News Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Trending News</h2>
              <ul className="space-y-4">
                {trendingNews.map((newsItem, index) => (
                  <li key={index} className="border-b border-gray-200 pb-2 flex flex-col">
                    <img className="rounded-lg mb-2" src={newsItem.image} alt={newsItem.title} />
                    <h3 className="font-semibold text-gray-800">{newsItem.title}</h3>
                    <p className="text-sm text-gray-600">{newsItem.summary}</p>
                    <a href={newsItem.link} className="text-blue-500 hover:underline mt-2 inline-block">
                      Read more
                    </a>
                  </li>
                ))}
              </ul>
            </div>
      
            {/* Top News Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Top News</h2>
              <ul className="space-y-4">
                {topNews.map((newsItem, index) => (
                  <li key={index} className="border-b border-gray-200 pb-2 flex flex-col">
                    <img className="rounded-lg mb-2" src={newsItem.image} alt={newsItem.title} />
                    <h3 className="font-semibold text-gray-800">{newsItem.title}</h3>
                    <p className="text-sm text-gray-600">{newsItem.summary}</p>
                    <a href={newsItem.link} className="text-blue-500 hover:underline mt-2 inline-block">
                      Read more
                    </a>
                  </li>
                ))}
              </ul>
            </div>
      
            {/* Breaking News Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Breaking News</h2>
              <ul className="space-y-4">
                {breakingNews.map((newsItem, index) => (
                  <li key={index} className="border-b border-gray-200 pb-2 flex flex-col">
                    <img className="rounded-lg mb-2" src={newsItem.image} alt={newsItem.title} />
                    <h3 className="font-semibold text-gray-800">{newsItem.title}</h3>
                    <p className="text-sm text-gray-600">{newsItem.summary}</p>
                    <a href={newsItem.link} className="text-blue-500 hover:underline mt-2 inline-block">
                      Read more
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
      
          {/* Blog Section */}
          <div className="mt-8 bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">From the Blog</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Blog Post 1 */}
              <div className="bg-gray-200 p-4 rounded-lg">
                <img className="rounded-lg mb-2" src="https://via.placeholder.com/300" alt="Blog post 1" />
                <h3 className="text-lg font-semibold text-gray-800">How to Stay Informed in the Digital Age</h3>
                <p className="text-sm text-gray-600 mt-2">Staying informed has never been easier with the internet at your fingertips...</p>
                <a href="#" className="text-blue-500 hover:underline mt-2 inline-block">Read more</a>
              </div>
      
              {/* Blog Post 2 */}
              <div className="bg-gray-200 p-4 rounded-lg">
                <img className="rounded-lg mb-2" src="https://via.placeholder.com/300" alt="Blog post 2" />
                <h3 className="text-lg font-semibold text-gray-800">The Future of Journalism</h3>
                <p className="text-sm text-gray-600 mt-2">Exploring how journalism is evolving and adapting to new technologies...</p>
                <a href="#" className="text-blue-500 hover:underline mt-2 inline-block">Read more</a>
              </div>
            </div>
          </div>
      
          {/* Ads Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sponsored Content</h2>
            <div className="flex justify-center items-center h-48 bg-gray-200 rounded">
              {/* Placeholder for ad content */}
              <p className="text-gray-500">Your ad content here</p>
            </div>
          </div>
        </div>
      </div>
      
      
    )
}


export default News 