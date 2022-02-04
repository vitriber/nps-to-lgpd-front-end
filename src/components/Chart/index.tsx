import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from 'recharts';
import { Title } from '../Title';
import { Questionary } from '../../pages/Questionary/Interfaces/QuestionaryInterface';
import { ChartData } from './interfaces/ChartInterface';

interface Props {
  questionnaires: Questionary[] | undefined;
}

export const Chart = ({ questionnaires }: Props): JSX.Element => {
  const theme = useTheme();
  const [formatedQuestionnaires, setFormatedQuestionnaires] =
    useState<ChartData[]>();

  useEffect(() => {
    if (questionnaires !== undefined) {
      const formated = questionnaires?.map(questionary => {
        const date = new Date(questionary.updated_at);
        return {
          time: `${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`,
          nps_value: questionary.nps_value,
        };
      });
      setFormatedQuestionnaires(formated);
    }
  }, [questionnaires]);

  return (
    <>
      <Title>Hoje</Title>
      <ResponsiveContainer>
        <LineChart
          data={formatedQuestionnaires}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              NPS
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="nps_value"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};
