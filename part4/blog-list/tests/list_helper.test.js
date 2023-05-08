const listHelper = require('./../utils/list_helper');

describe('total likes ', () => {
  const listWithOneBlog = [
    {
    _id: '607f16e2e6845b5a5c9a1249',
    title: 'My First Week as a Junior Developer',
    author: 'Jane Smith',
    url: 'https://myblog.com/first-week-junior-developer',
    likes: 10,
    __v: 0
    },
  ]

  const listWithThreeBlogs = [
  {
    _id: '607f16e2e6845b5a5c9a1249',
    title: 'My First Week as a Junior Developer',
    author: 'Jane Smith',
    url: 'https://myblog.com/first-week-junior-developer',
    likes: 10,
    __v: 0
  },
  {
    _id: '607f16e2e6845b5a5c9a124a',
    title: 'Learning to Code: My Journey',
    author: 'Jane Smith',
    url: 'https://myblog.com/learning-to-code-my-journey',
    likes: 20,
    __v: 0
  },
  {
    _id: '607f16e2e6845b5a5c9a124b',
    title: 'Debugging Tips for Junior Developers',
    author: 'Jane Smith',
    url: 'https://myblog.com/debugging-tips-for-junior-developers',
    likes: 15,
    __v: 0
  }
];

  test('of list with no blog posts', () => {
    const res = listHelper.totalLikes([])
    expect(res).toBe(0)
  })

  test('of list with one blog post', () => {
    const res = listHelper.totalLikes(listWithOneBlog)
    expect(res).toBe(10)
  })

  test('of list with three blog posts', () => {
    const res = listHelper.totalLikes(listWithThreeBlogs)
    expect(res).toBe(45)
  })
})

describe('Total likes of favorite blog', () => {
    const listWithThreeBlogs = [
  {
    title: 'My First Week as a Junior Developer',
    author: 'Jane Smith',
    likes: 10,
  },
  {
    title: 'Learning to Code: My Journey',
    author: 'Jane Smith',
    likes: 20,
  },
  {
    title: 'Debugging Tips for Junior Developers',
    author: 'Jane Smith',
    likes: 15,
  }
];

const listWithThreeBlogsEqualLikes = [
  {
    title: 'My First Week as a Junior Developer',
    author: 'Jane Smith',
    likes: 10,
  },
  {
    title: 'Learning to Code: My Journey',
    author: 'Jane Smith',
    likes: 10,
  },
  {
    title: 'Debugging Tips for Junior Developers',
    author: 'Jane Smith',
    likes: 10,
  }
];

  test('of an empty list', () => {
    const res = listHelper.favoriteBlog([])
    expect(res).toBe(0)
  })

  test('of list of three blogs', () => {
    const res = listHelper.favoriteBlog(listWithThreeBlogs)
    expect(res).toBe(20)
  })

  test('of list of three blogs with equal likes', () => {
    const res = listHelper.favoriteBlog(listWithThreeBlogsEqualLikes)
    expect(res).toBe(10)
  })
})

describe('Total authors', () => {
  const listOfBlogsWithMultipleAuthors = [
  {
    title: 'My First Week as a Junior Developer',
    author: 'Jane Smith',
    likes: 10,
  },
  {
    title: 'Learning to Code: My Journey',
    author: 'Jane Smith',
    likes: 10,
  },
  {
    title: 'Debugging Tips for Junior Developers',
    author: 'Jane Smith',
    likes: 10,
  },
  {
    title: 'A Day in the Life of a Software Engineer',
    author: 'Jane Smith',
    likes: 15,
  },
  {
    title: 'Understanding JavaScript Closures',
    author: 'John Doe',
    likes: 20,
  },
  {
    title: 'Top 10 Programming Languages to Learn in 2023',
    author: 'Alice Johnson',
    likes: 25,
  },
  {
    title: 'How to Get Started with Web Development',
    author: 'Alice Johnson',
    likes: 30,
  },
  {
    title: 'CSS Grid vs Flexbox: Which One to Choose?',
    author: 'Bob Brown',
    likes: 35,
  },
  {
    title: 'The Art of Writing Clean Code',
    author: 'Bob Brown',
    likes: 40,
  }
];

  const listOfBlogsWithMultipleAuthorsButEqual = [
  {
    title: 'My First Week as a Junior Developer',
    author: 'Jane Smith',
    likes: 10,
  },
  {
    title: 'Learning to Code: My Journey',
    author: 'Jane Smith',
    likes: 10,
  },
  {
    title: 'Debugging Tips for Junior Developers',
    author: 'Jane Smith',
    likes: 10,
  },
  {
    title: 'A Day in the Life of a Software Engineer',
    author: 'John Doe',
    likes: 15,
  },
  {
    title: 'Understanding JavaScript Closures',
    author: 'John Doe',
    likes: 20,
  },
  {
    title: 'Top 10 Programming Languages to Learn in 2023',
    author: 'John Doe',
    likes: 25,
  },
];

  test('author with the most blogs', () => {
    const exp = {
      author: undefined,
      blogs: undefined, 
    }
    const res = listHelper.mostBlogs([])
    expect(res).toEqual(exp)
  });

  test('author with the most blogs', () => {
    const exp = {
      author: "Jane Smith",
      blogs: 4, 
    }

    const res = listHelper.mostBlogs(listOfBlogsWithMultipleAuthors)
    expect(res).toEqual(exp)
  });

  test('author with the most blogs but equal', () => {
    const exp1 = {
      author: "Jane Smith",
      blogs: 3, 
    }
    const exp2 = {
      author: "Jane Smith",
      blogs: 3, 
    }
    const res = listHelper.mostBlogs(listOfBlogsWithMultipleAuthorsButEqual)
    expect(res).toEqual(exp1 || exp2)
  });
});
