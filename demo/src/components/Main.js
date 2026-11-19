import React, { Component } from "react";
import i18next from "i18next";
import {
  Calendar,
  DateRange,
  DateRangePicker,
  DefinedRange,
} from "../../../src";
import { format, addDays } from "date-fns";
import Section from "./Section";

import "normalize.css";
import "../styles/global.css";
import "../styles/main.css";

import "../../../src/styles.scss";
import "../../../src/theme/default.scss";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

function renderStaticRangeLabel(staticRange) {
  return (
    <CustomStaticRangeLabelContent text={"This is a custom label content: "} />
  );
}

// const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const timeZone = "Pacific/Auckland"; // Example timezone, can be changed
// const timeZone = "Pacific/Kiritimati"; // Example timezone, can be changed

class CustomStaticRangeLabelContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDateString: Date(),
    };

    this.intervalId = setInterval(() => {
      this.setState({
        currentDateString: Date(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    const { currentDateString } = this.state;
    const { text } = this.props;

    return (
      <span>
        <i>{text}</i>
        <span className={"random-date-string"}>
          <b>{currentDateString}</b>
        </span>
      </span>
    );
  }
}

function formatDateDisplay(date, defaultText) {
  if (!date) return defaultText;
  return format(date, "P");
}

export default class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dateRange: {
        selection: {
          startDate: new Date(),
          endDate: null,
          key: "selection",
        },
      },
      dateRangeWithDisabled: {
        selection: {
          startDate: addDays(new Date(), 4),
          endDate: null,
          key: "selection",
        },
      },
      definedRange: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      },
      dateRangePickerI: {
        selection: {
          startDate: new Date(),
          endDate: null,
          key: "selection",
        },
        compare: {
          startDate: new Date(),
          endDate: addDays(new Date(), 3),
          key: "compare",
        },
      },
      multipleRanges: {
        selection1: {
          startDate: addDays(new Date(), 1),
          endDate: null,
          key: "selection1",
        },
        selection2: {
          startDate: addDays(new Date(), 4),
          endDate: addDays(new Date(), 8),
          key: "selection2",
        },
        selection3: {
          startDate: addDays(new Date(), 8),
          endDate: addDays(new Date(), 10),
          key: "selection3",
          showDateDisplay: false,
          autoFocus: false,
        },
      },
      datePickerInternational: null,
      locale: "ja",
      dateRangePicker: {
        selection: {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: "selection",
        },
      },
    };
  }

  handleChange(which, payload) {
    // console.log(which, payload);
    this.setState({
      [which]: payload,
    });
  }

  handleRangeChange(which, payload) {
    this.setState({
      [which]: {
        ...this.state[which],
        ...payload,
      },
    });
  }

  render() {
    return (
      <main className={"Main"}>
        <h1 className={"Title"}>React-date-range</h1>
        <p data-testid="demo-application-translation">
          {i18next.t("demoApplicationText")}
        </p>

        <Section title={`DateRangePicker - 2 month (${timeZone})`}>
          <div>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(
                this.state.dateRangePicker.selection.startDate
              )}
            />
            <input
              type="text"
              readOnly
              value={formatDateDisplay(
                this.state.dateRangePicker.selection.endDate
              )}
            />
          </div>
          <div>
            <DateRangePicker
              onChange={this.handleRangeChange.bind(this, "dateRangePicker")}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              className={"PreviewArea"}
              months={2}
              ranges={[this.state.dateRangePicker.selection]}
              direction="horizontal"
              showTime={true}
              timeZone={timeZone}
              time24hFormat={true}
              dateFormat={"MMM yyyy"}
              minDate={new Date()}
            />
          </div>
        </Section>

        <Section
          title={`DateRangePicker - 2 month with no Defined Ranges (America/New_York)`}
        >
          <div>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(
                this.state.dateRangePicker.selection.startDate
              )}
            />
            <input
              type="text"
              readOnly
              value={formatDateDisplay(
                this.state.dateRangePicker.selection.endDate
              )}
            />
          </div>
          <div>
            <DateRangePicker
              onChange={this.handleRangeChange.bind(this, "dateRangePicker")}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              className={"PreviewArea"}
              months={2}
              ranges={[this.state.dateRangePicker.selection]}
              direction="horizontal"
              showDefinedRange={false}
              timeZone="America/New_York"
            />
          </div>
        </Section>

        <Section title="DateRangePicker - Vertical Infinite">
          <div>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(
                this.state.dateRangePickerI.selection.startDate
              )}
            />
            <input
              type="text"
              readOnly
              value={formatDateDisplay(
                this.state.dateRangePickerI.selection.endDate
              )}
            />
          </div>
          <div>
            <DateRangePicker
              onChange={this.handleRangeChange.bind(this, "dateRangePickerI")}
              className={"PreviewArea"}
              months={1}
              minDate={addDays(new Date(), -300)}
              maxDate={addDays(new Date(), 900)}
              direction="vertical"
              scroll={{ enabled: true }}
              ranges={[
                this.state.dateRangePickerI.selection,
                this.state.dateRangePickerI.compare,
              ]}
            />
          </div>
        </Section>

        <Section title="DateRangePicker - Multiple Range">
          <div>
            <label className={"label"}>Selection1 Start:</label>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(
                this.state.multipleRanges.selection1.startDate,
                "-"
              )}
            />
            <label className={"label"}>Selection1 End:</label>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(
                this.state.multipleRanges.selection1.endDate,
                "Continuous"
              )}
            />
            <div className={"newLine"} />

            <label className={"label"}>Selection2 Start:</label>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(
                this.state.multipleRanges.selection2.startDate,
                "-"
              )}
            />
            <label className={"label"}>Selection2 End:</label>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(
                this.state.multipleRanges.selection2.endDate,
                "Continuous"
              )}
            />
            <div className={"newLine"} />

            <label className={"label"}>Selection3 Start:</label>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(
                this.state.multipleRanges.selection3.startDate,
                "-"
              )}
            />
            <label className={"label"}>Selection3 End:</label>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(
                this.state.multipleRanges.selection3.endDate,
                "Continuous"
              )}
            />
          </div>
          <DateRangePicker
            onChange={this.handleRangeChange.bind(this, "multipleRanges")}
            ranges={[
              this.state.multipleRanges.selection1,
              this.state.multipleRanges.selection2,
              this.state.multipleRanges.selection3,
            ]}
            className={"PreviewArea"}
          />
        </Section>

        <Section title="RangePicker">
          <div>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(
                this.state.dateRange.selection.startDate
              )}
            />
            <input
              type="text"
              readOnly
              value={formatDateDisplay(
                this.state.dateRange.selection.endDate,
                "Continuous"
              )}
            />
          </div>

          <DateRange
            onChange={this.handleRangeChange.bind(this, "dateRange")}
            moveRangeOnFirstSelection={false}
            ranges={[this.state.dateRange.selection]}
            className={"PreviewArea"}
          />
        </Section>
        <Section title="DefinedRange">
          <div>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(
                this.state.definedRange.selection.startDate
              )}
            />
            <input
              type="text"
              readOnly
              value={formatDateDisplay(
                this.state.definedRange.selection.endDate,
                "Continuous"
              )}
            />
          </div>

          <DefinedRange
            ranges={[this.state.definedRange.selection]}
            renderStaticRangeLabel={renderStaticRangeLabel}
            staticRanges={[
              {
                label: "Hoy",
                hasCustomRendering: true,
                range: () => ({
                  startDate: new Date(),
                  endDate: new Date(),
                }),
                isSelected() {
                  return true;
                },
              },
            ]}
            onChange={this.handleRangeChange.bind(this, "definedRange")}
            className={"centered"}
          ></DefinedRange>
        </Section>
        <Section title="RangePicker with disabled dates">
          <div>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(
                this.state.dateRangeWithDisabled.selection.startDate
              )}
            />
            <input
              type="text"
              readOnly
              value={formatDateDisplay(
                this.state.dateRangeWithDisabled.selection.endDate,
                "Continuous"
              )}
            />
          </div>

          <DateRange
            onChange={this.handleRangeChange.bind(
              this,
              "dateRangeWithDisabled"
            )}
            moveRangeOnFirstSelection={false}
            ranges={[this.state.dateRangeWithDisabled.selection]}
            className={"PreviewArea"}
            disabledDates={[new Date(), addDays(new Date(), 3)]}
            minDate={addDays(new Date(), -3)}
          />

          <DefinedRange
            ranges={[this.state.definedRange.selection]}
            renderStaticRangeLabel={renderStaticRangeLabel}
            staticRanges={[
              {
                hasCustomRendering: true,
                range: () => ({
                  startDate: new Date(),
                  endDate: new Date(),
                }),
                isSelected() {
                  return true;
                },
              },
            ]}
            onChange={this.handleRangeChange.bind(this, "definedRange")}
            className={"centered"}
          />
        </Section>
      </main>
    );
  }
}
