import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    const expectedPosts = posts.map((item, index)=> ({...item, id: (index + 1).toString()}))

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      // реализуйте тест-кейс
      expect(postsService.findMany()).toEqual(expectedPosts);
    });

    it('should return correct posts for skip and limit options', () => {
      // реализуйте тест-кейс
      expect(postsService.findMany({skip: 1, limit: 2})).toEqual([expectedPosts[1], expectedPosts[2]]);
    });

    // реализуйте недостающие тест-кейсы
    it("should return empty posts if skip all", ()=>{
      expect(postsService.findMany({skip: posts.length, limit: 1})).toEqual([]);
    });
    it("should return all if not skip all", ()=>{
      expect(postsService.findMany({skip: 0, limit: posts.length})).toEqual(expectedPosts);
    });
    it("should return all if limit = Infinity", ()=>{
      expect(postsService.findMany({skip: 0, limit: Infinity})).toEqual(expectedPosts);
    })
    it("should return empty if skip Infinity", ()=>{
      expect(postsService.findMany({skip: Infinity, limit: 1})).toEqual([]);
    })
    it("should return all if not skip and limit", ()=>{
      expect(postsService.findMany()).toEqual(expectedPosts);
    })
    it("should return 3 if not skip and limit = 3", ()=>{
      expect(postsService.findMany({limit: 3})).toEqual([expectedPosts[0], expectedPosts[1], expectedPosts[2]]);
    })
    it("should return 2 end if skip 2", ()=>{
      expect(postsService.findMany({skip: 2})).toEqual([expectedPosts[2], expectedPosts[3]]);
    })
    it("should return all if skip minus 1", ()=>{
      expect(postsService.findMany({skip: -1})).toEqual([expectedPosts[3]]);
    })
    it("should return end 2 if limit = minus 2", ()=>{
      expect(postsService.findMany({limit: -2})).toEqual([expectedPosts[0], expectedPosts[1]]);
    })
    it("should return from two to three if skip = -3 and limit =-2", ()=>{
      expect(postsService.findMany({skip: -3, limit: -2})).toEqual([expectedPosts[1]]);
    })
  });
});