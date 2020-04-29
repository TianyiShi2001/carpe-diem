# carpe-diem

A handy task recorder for people who don't make plans but do care about their efficiency. Help this project

# 🙋‍♂️Help WANTED!

I want to prosimify my stopwatch function which is currently implemented using Node.js `EventEmitter` and callbacks but currently I haven't found a way to do it. Please see [this stackoverflow question](https://stackoverflow.com/questions/61392232/how-to-break-an-infinite-loop-inside-a-function-on-keystroke-in-node-js).

# 📖Table of Contents

- [carpe-diem](#carpe-diem)
- [🙋‍♂️Help WANTED!](#%f0%9f%99%8b%e2%80%8d%e2%99%82%ef%b8%8fhelp-wanted)
- [📖Table of Contents](#%f0%9f%93%96table-of-contents)
- [🛠Installation](#%f0%9f%9b%a0installation)
- [🜎Philosophy](#%f0%9f%9c%8ephilosophy)
  - [💡Real-World Example](#%f0%9f%92%a1real-world-example)
- [🚀Quick Start](#%f0%9f%9a%80quick-start)
  - [`i will`](#i-will)
    - [Use a single-line command with flags:](#use-a-single-line-command-with-flags)
    - [Interactive mode:](#interactive-mode)
    - ['Natural language' mode (NOT IMPLEMENTED YET):](#natural-language-mode-not-implemented-yet)
  - [`i did`](#i-did)
    - [Use a single-line command with flags:](#use-a-single-line-command-with-flags-1)
    - [Interactive mode:](#interactive-mode-1)
    - ['Natural language' mode (NOT IMPLEMENTED YET):](#natural-language-mode-not-implemented-yet-1)
  - [`i show`](#i-show)
- [🌟Advanced Features](#%f0%9f%8c%9fadvanced-features)
  - [Custom Attributes](#custom-attributes)
- [✅TODOs](#%e2%9c%85todos)
- [Compared To Other Command line time trackers](#compared-to-other-command-line-time-trackers)
  - [Custom Attributes](#custom-attributes-1)
  - [Natural Language Support](#natural-language-support)
- [📝Change Log](#%f0%9f%93%9dchange-log)

# 🛠Installation

```bash
npm i -g carpe-diem
```

# 🜎Philosophy

- Tracking time itself should not be a waste of time. You should not be limited to doing tasks in 1-hour or 30-minute blocks, for example. You should be able to do a task for as long as you want, and the exact time and duration, precise to seconds, are recorded, without any manual specification.
- You are not limited to adding a generic note to your task. You can add custom attributes to each task. `read textbook` can have `bookName`, `chapter`, `pageStart` and `pageEnd`, for example.
  - Using custom attributes should not be wasting too much time. Each time you record a new `bookName`, they will appear in a list for you to select next time you `read textbook`.
  - Of course, the list is not random or alphabetical, the books you read recently and most frequently appear on the top. `carpe-diem` not only saves you from typing (or copying-pasting) attribute names again and again, but even minimises the number of times you press the down-arrow key.
- Rich information and high flexibility should not make things more complicated and confusing, but instead should make things easier
  - You should be able to do data analysis easily on the recorded information. Custom attributes helps a lot (for example, you can compare your efficiency of reading different books, if you've recorded `pageStart` and `pageEnd` well.)
  - If you are not an expert in data analysis, you can gain much information from automatically generated summaries.
  - Recorded information should be easily converted into other formats, such as `ics`, if you want to visualise them in ways you're used to

## 💡Real-World Example

Let's consider a simple real-life situation. Imagine it's 10:06 now, and you are about to read a textbook.

🤔This is what you would probably do if you use a digital calendar (iCal or Outlook) to record your tasks.

- You open the calendar, wait for it to load, and click `add new`.
- You type in `read textbook` as the title of the event
- Chances are your calendar provides a start time of 10:00 today and a duration of 1 hour (i.e. an end time of 11:00).
- You think, "No, it's 10:06, and I'll start 2 minutes later, that is, 10:08, after I finish filling in the details into this calendar event, not 10:00." So you edited the `start time` field manually by either using a scroll bar on phone or typing in on a computer (BTW, Mac's TouchBar won't help, as it only allows you to choose times at XX:00, XX:15, XX:30, and XX:45.)
- Then you think, "I shall work harder and read for 1 hour and half", so you also incremented the end time manually.
- **Finally you start reading.**
- At 11:38, which is the time you expect to stop, you are just about to finish a subsection, so you carry on and finish it, and finally your reading session ends at 11:47
- At the end, you go back and edit the event on calendar to reset the end time.


😎In contrast, this is what you would do using `carpe-diem`:

- open a terminal
- run `i will`
- **Insead of typing 'read textbook' manually, you are prompted to _select_**, using arrow keys, from a list of recent activities. If you've been working hard, chances are you only need to hit the down-arrow key three times or so and hit `Enter`. If you can't find `read textbook` in the list but have done this task previously, you just need to type `re` (or `tex`), and the list will be updated with the search results according to what you've entered on the fly (like suggestions under the google search box, but faster and more precise as it's based on local data)
- You will then be prompted to enter the *expected* duration of your reading session. **You can skip this**, as it won't affect the *actual* duration (start and end time) of this task. It will just set up a countdown timer as a reference. If you want this, you simply type `1h30m` or `90m`.
- **Instead of specifying the start and end time manually,** they are completed implicitly. When you finish this prompt, a stopwatch will start and the start time is recorded. You'll be able to monitor the time elapsd, and and you can stop the stopwatch **whenever you want**, and the end time (hence duration) is recorded accordingly.

Let's re-consider the same scenario, this time assuming you're an unfortunate person whose focus is frequently interrupted:

😣Using calendar:

- You create the event `10:06-11:36 read textbook`, as described above.
- However, things do not always go according to plan. At 10:53, your tutor angrily tells you that you omitted a question on the last page of the worksheet. You stop reading, adjust the end time of your reading session to be 10:53, and turn your focus to the worksheet.
- Unfortunately, though, at 11:05, 12 minutes aftert you start off, you realised that you missed one lecture whose content is crucial for solving part of this question.
- You take a minute to record `10:53-11:05 do Worksheet` on calendar, and then set out to learn that piece of lecture handout. After 15 minutes of learning, you record `11:06-11:21 learn lecture notes` on calendar, go back to the worksheet, and take another 20 minutes to solve it. Then you record `11:21-11:41 do worksheet` on calendar.
- Finally, after emailing your work back to your tutor, you can continue reading the textbook. You copy and paste the previously created event `10:06-11:36 read textbook` and updated the times accordingly.

😎Using `carpe-diem`:

- `i w`, then select `read textbook`
- Upon receiving yout tutor's message, hit `q` to abort.
- `i w --interrupt`, then select `do worksheet`
- Upon encountering the difficult part of the question, hit `q` to abort again.
- `i w --interrupt`, then select `learn lecture notes`.
- Upon knowing how to solve the question, `i w --continue` (`carpe-diem` knows you'll continue to `do worksheet`)
- Upon finishing worksheet, `i w --continue` again (to `read textbook`)
- **All times and durations are recorded precisely.**

Let's re-consider the same scenario again, this time assuming you're a meticulous person who want to be detailed about what you record.

😫Using calendar:

- You create the event `10:06-11:36 read textbook`, as described above.
- If you're that type of meticulous person, you also make notes: "And I'm reading 'Molecular Biology of the Cell' by Alberts, Chapter 5, page 237 to... when I finish I'll come back and complete the page I ended".
- When you finish, you open the event and add that end page (and likely also modify the end time).
- You type that much when you record a `read textbook` event every time. Copying-and-pasting won't be much faster (it can be even slower).
- It is extremely difficult to make a summary of your effort in reading textbooks. The data is difficult to extract and not standardised.

😎Using `carpe-diem`:

- `i w`, then select `read textbook`.
- If you have done proper configuration for the task `read textbook` previously, then, **instead of typing 'Molecular Biology of the Cell by Alberts' manually**, you'll again be able to **select** from a list of textbooks you've read previously. You can also do a search to narrow down the choices, if necessary. In next steps, you enter the the chapter and the start page similarly. These steps are the result of setting *custom attributes*.
- Stopwatch starts.
- When you finish, you hit `q`, and you are then prompted to enter the end page.
- Everything can be formatted in a plain JSON file. You can do data analysis easily.


# 🚀Quick Start

## `i will`

The `i will` (alias: `i w`) command means: now I will start doing some task, please record my task details and start timing (optionally, also display a countdown if an expected duration is expected). When I stop the stopwatch by hitting `q`, log my task details, date+time and duration.

The countdown will not affect the actual duration. When time's up, you'll get a reminder, but you can just ignore it and the stopwatch will not stop until you hit `q` explicitly.

### Use a single-line command with flags:

- `i will --do foo bar`: I will do the task named `foo bar`. Start timing.
- `i will --do foo bar --for 2h30m`: I will do the task named `foo bar` and I expect it to take 2 hours and 30 minutes, start timing and countdown.
- `i will --do foo bar --for 2.5h`: same as above. The duration option is parsed from natural language. Thus, You can also write something like `--for 2 hours and 30 minutes` or `--for 2 hrs 30 min`, but personally I find `--for 2h30m` or `--for 2.5h` easier.

Note that you are more likely to use the alias `i w` in reality.

### Interactive mode:

Just `i will` or `i w`. You will be able to select from a list of tasks you've done previously, or you can enter a new task. You will be prompted to select or enter an expected duration (you can write `2.5h` or `2h30min`, as described above), but you can skip this.

### 'Natural language' mode (NOT IMPLEMENTED YET):

This is inspired by SQL.

- `i will do foo bar` or `i will foo bar` is equivalent to `i will --do foo bar`
- `i will do foo bar for 2.5h` or `i will foo bar for 2.5h` is equivalent to `i will --do foo bar --for 2.5h`

## `i did`

The `i did` (alias: `i d`) command means: I did some task, and I know when it started and how long it took. Please log my task details, date+time and duration.

### Use a single-line command with flags:

(Note that you are more likely to use the alias `i d` in reality.)

- `i did --do foo bar --at 15:00 --for 2.5h`
- `i did --do foo bar --at 15:00 yesterday --for 2.5h`
- `i did --do foo bar --at 15:00 on Monday --for 2.5h`

Self-explainatory, isn't it?

### Interactive mode:

Just `i did` or `i d`. Similar to the interative mode of `i will`, but you have to specify the start time and duration.

### 'Natural language' mode (NOT IMPLEMENTED YET):

## `i show`

- `i show log`: show the log (the list of tasks you've done), in JSON format

# 🌟Advanced Features

## Custom Attributes

Each task can have several associated attributes. For example, for the task `read textbook`, there can be attributes `bookName`, `pageStart`, `pageEnd`, `chapter`, for example. Custom attributes can be set using the `i edit tasks` command, and once they're set, additional prompts will be generated for this task.

# ✅TODOs

- `i summarise` functionalities
- task tags/categories (and/or hierachical classification?)
- elaborate custom attributes
- inquirer? enquirer? prompts?

# Compared To Other Command line time trackers

[Doing](https://github.com/ttscoff/doing/)

## Custom Attributes

## Natural Language Support

carpe-diem:

```bash
i did foo bar at 15:00 for 2h30m
```

Timetrap:

```bash
t out --at "in 30 minutes"
t edit --start "last monday at 10:30am"
t edit --end "tomorrow at noon"
t display --start "10am" --end "2pm"
t i -a "2010-11-29 12:30:00"
```

||[carpe-diem](https://github.com/TianyiShi2001/carpe-diem)|[Timetrap](https://github.com/samg/timetrap)|
|Language|Typescript (Node.js)|Ruby|


# 📝Change Log

See [CHANGELOG.md](./CHANGELOG.md)