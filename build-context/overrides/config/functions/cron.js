'use strict';

module.exports = {
  '* * * * *': async () => {
    const now = new Date();

    console.log(`Searching draft posts to publish until ${now}...`);

    const draftPostsToPublish = (await strapi.api.posts.services.posts.find({
      _publicationState: 'preview',
      published_at_null: true,
      publish_at_lt: now,
    })).filter(p => !p.unpublish_at || p.unpublish_at > now);

    if (draftPostsToPublish.length > 0) {
      console.log(`Publishing ${draftPostsToPublish.length} draft posts...`);

      await Promise.all(draftPostsToPublish.map(post => {
        return strapi.api.posts.services.posts.update(
          { id: post.id },
          { published_at: now }
        );
      }));

      console.log(`Published ${draftPostsToPublish.length} draft posts.`);
    } else {
      console.log(`There are no draft posts to publish until ${now}.`);
    }

    console.log(`Searching published posts to unpublish until ${now}...`);

    const publishedPostsToUnpublish = await strapi.api.posts.services.posts.find({
      _publicationState: 'live',
      unpublish_at_lt: now,
    });

    if (publishedPostsToUnpublish.length > 0) {
      console.log(`Unpublishing ${publishedPostsToUnpublish.length} published posts...`);

      await Promise.all(publishedPostsToUnpublish.map(post => {
        return strapi.api.posts.services.posts.update(
          { id: post.id },
          { published_at: null }
        );
      }));

      console.log(`Unpublished ${publishedPostsToUnpublish.length} published posts.`);
    } else {
      console.log(`There are no published posts to unpublish until ${now}.`);
    }
  },
};
