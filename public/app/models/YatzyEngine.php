<?php

namespace Yatzy;
class YatzyEngine
{
    public function scoreTurn($game, $scoreBox)
    {
        $diceValues = $game->diceValues;
        $score = 0;

        switch ($scoreBox) {
            case 'ones':
                $score = array_sum(array_filter($diceValues, fn($v) => $v == 1));
                break;
            case 'twos':
                $score = array_sum(array_filter($diceValues, fn($v) => $v == 2));
                break;
            case 'threes':
                $score = array_sum(array_filter($diceValues, fn($v) => $v == 3));
                break;
            case 'fours':
                $score = array_sum(array_filter($diceValues, fn($v) => $v == 4));
                break;
            case 'fives':
                $score = array_sum(array_filter($diceValues, fn($v) => $v == 5));
                break;
            case 'sixes':
                $score = array_sum(array_filter($diceValues, fn($v) => $v == 6));
                break;
            case 'threeOfAKind':
                if ($this->hasOfAKind($diceValues, 3)) {
                    $score = array_sum($diceValues);
                }
                break;
            case 'fourOfAKind':
                if ($this->hasOfAKind($diceValues, 4)) {
                    $score = array_sum($diceValues);
                }
                break;
            case 'fullHouse':
                if ($this->hasFullHouse($diceValues)) {
                    $score = 25;
                }
                break;
            case 'smallStraight':
                if ($this->hasSmallStraight($diceValues)) {
                    $score = 30;
                }
                break;
            case 'largeStraight':
                if ($this->hasLargeStraight($diceValues)) {
                    $score = 40;
                }
                break;
            case 'yahtzee':
                if ($this->hasOfAKind($diceValues, 5)) {
                    $score = 50;
                }
                break;
            case 'chance':
                $score = array_sum($diceValues);
                break;
        }

        return $score;
    }

    private function hasOfAKind($diceValues, $count)
    {
        $counts = array_count_values($diceValues);
        foreach ($counts as $value) {
            if ($value >= $count) {
                return true;
            }
        }
        return false;
    }

    private function hasFullHouse($diceValues)
    {
        $counts = array_count_values($diceValues);
        return count($counts) == 2 && in_array(3, $counts) && in_array(2, $counts);
    }

    private function hasSmallStraight($diceValues)
    {
        sort($diceValues);
        $straights = [[1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6]];
        foreach ($straights as $straight) {
            if (array_intersect($straight, $diceValues) == $straight) {
                return true;
            }
        }
        return false;
    }

    private function hasLargeStraight($diceValues)
    {
        sort($diceValues);
        return $diceValues == [1, 2, 3, 4, 5] || $diceValues == [2, 3, 4, 5, 6];
    }
}
