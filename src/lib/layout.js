const daySize = `2.75em`
const dayContainerMargin = `0.125em`
const dayContentMargin = `0.125em`
const dayContentSize = daySize - (dayContentMargin * 2)

export const calendar = {
  timeContainer: {
    timeContent: {

    }
  },
  dateContainer: {
    dateContent: {

    }
  },
  monthControlContainer: {
    monthControlContent: {

    }
  },
  calendarContainer: {
    dayNamesContainer: {
      dayNameContainer: {
        dayNameContent: {

        }
      }
    },
    daysContainer: {
      dayContainer: {
        style: {
          position: `relative`,
          float: `left`,
          width: `${daySize}`,
          height: `${daySize}`,
          margin: `${dayContainerMargin} 0`
          // &.start-range
          //   background-color: $highlightForeColorDark
          //   border-radius: 1.25em 0 0 1.25em
          //   > .day-content
          //     border-radius: 1.25em 0 0 1.25em
          //     color: white
          // &.in-range
          //   background-color: $highlightForeColor
          //   > .day-content
          //     color: #EEE
          // &.end-range
          //   background-color: $highlightForeColorDark
          //   border-radius: 0 1.25em 1.25em 0
          //   > .day-content
          //     color: white
          //     border-radius: 0 1.25em 1.25em 0
          // &.today
          //   background-color: $highlightBackColor
          //   > .day-content
          //     background-color: $highlightForeColor
        },
        dayContent: {
          style: {
            position: `relative`,
            height: `${dayContentSize}`,
            width: `${dayContentSize}`,
            margin: `${dayContentMargin}`,
            lineHeight: `${dayContentSize}`,
            ':hover': {
              backgroundColor: `rgba(0, 0, 0, 0.5)`
            }
          },
          span: {
            style: {
              position: `absolute`,
              width: `100%`,
              textAlign: `center`,
              fontWeight: 400
            }
          }
        }
      }
    }
  }
}
