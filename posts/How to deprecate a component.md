---
tags: post
layout: post.liquid
title: How to deprecate a component
---

If you work on a long-lived codebase, you will inevitably need to deprecate a component. Your decisions are no longer valid, or you found a better way to achieve the same result.

Sometimes, you are lucky enough to modify and keep the existing component, but sometimes, the changes are more radical, and you need a complete replacement.

Once the new version of your component is ready, you are faced with a problem: how do you remove the old version?

I have developed a strategy that has served my teams and me well through the years and can also help you.

## Get everyone onboard

This first step is the foundation of any deprecation. You need to ensure all the stakeholders agree on deprecating the component in favor of a new one. Most importantly, you must decide how long it will take to complete the migration.

Often, I see teams starting a migration that gets forgotten because more pressing issues arise. That’s terrible! Migrations make your codebase more fragile and complicated to work with; instead of one way of doing things, you suddenly have two or more. This is why you must agree before starting a migration that it will be completed.

You then need to agree on how you will complete it. There’s no silver bullet, and it depends on your specific situation. If you are migrating a small component used just a dozen times, you might decide to invest a couple of days in migrating it. On the other hand, if your component is used hundreds of times or takes a long time to replace it, you will need a long-term strategy.

In these cases, I list all the deprecated components and set a rule for a team to remove N components every week or so. You will be tempted to skip some weeks because more important things arise. Don’t! Remind everyone of the commitment they took at the beginning of the migration.

## Make it obvious

Now that you agree on starting the migration, you must make it evident to everyone on the team that a component is being deprecated. This is crucial for two reasons:

1. If the team knows a component is deprecated, it will stop using it;
2. If replacing a deprecated component is not too hard, developers might apply the Boy Scout rule “Leave the code cleaner than you found it” and refactor it for you.

So, how do you make it obvious?

Imagine you want to deprecate a `Button` component and are creating a better one—this happened to me while working on an actual project. You might decide to make a new `NewButton` component. Don’t do that! Instead, call your new button `Button` and rename your old one to `DeprecatedButton`.

Most text editors will allow you to change the name of the component in all of your codebase, so now your files will look something like this:

```tsx
import DeprecatedButton from "@/components/DeprecatedButton";

function Page() {
  return (
    <div>
      Click here to buy:
      <DeprecatedButton>Buy</DeprecatedButton>
    </div>
  );
}
```

Talking about obvious! Now, even the junior developer joining your team next week will know at first glance that that component is deprecated.

Depending on your case, you can use different names: `DeprecatedButtonDoNotUse` or `DeprecatedWindowUseModalInstead` are good examples.

A complaint you might hear is that the new name is too long; it’s a pain to type and makes the code go on a new line. All valid complaints that have a simple solution: migrating to the new component. This is one of the cases where introducing a little bit of pain helps move things along.

## Monitor the migration

To ensure the migration progresses smoothly, it’s crucial to monitor and make the progress visible to everyone involved. This can be done during standup meetings or sprint planning sessions, whichever works best for your team. The key is establishing a consistent and regular cadence for checking migration status.

During these meetings, you can discuss the following points:

- The number of deprecated components that have been successfully replaced;
- Any challenges or roadblocks encountered during the migration;
- The overall timeline and whether it needs adjustment.

By making the migration progress visible and regularly discussing it, you can ensure that it remains a priority and doesn’t get forgotten or overshadowed by other tasks.

## Clean up after yourself

After the migration is complete and all deprecated components have been replaced, it’s time to remove the deprecated component and anything associated with it, such as tests and styles. This step is essential for maintaining a clean and tidy codebase.

After removing the deprecated component, take a moment with your team to reflect on the migration process. Consider any challenges or roadblocks that could have been addressed differently. Reflecting on the migration can provide valuable insights and help improve future migration processes.
