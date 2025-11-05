-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema zeonaut
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `zeonaut` ;

-- -----------------------------------------------------
-- Schema zeonaut
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `zeonaut` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `zeonaut` ;

-- -----------------------------------------------------
-- Table `zeonaut`.`aspect_reference`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zeonaut`.`aspect_reference` (
  `reference_id` VARCHAR(12) NOT NULL,
  `source_id` VARCHAR(45) NULL DEFAULT NULL,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `type` VARCHAR(50) NULL DEFAULT NULL,
  `value` VARCHAR(50) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`reference_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `zeonaut`.`player`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zeonaut`.`player` (
  `player_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`player_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `zeonaut`.`character_aspects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zeonaut`.`character_aspects` (
  `aspect_id` VARCHAR(12) NOT NULL,
  `player_id` INT NULL,
  `reference_id` VARCHAR(12) NULL DEFAULT NULL,
  `altered_value` VARCHAR(100) NULL DEFAULT NULL,
  `altered_description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`aspect_id`),
  INDEX `player_id` (`player_id` ASC) VISIBLE,
  INDEX `reference_id` (`reference_id` ASC) VISIBLE,
  CONSTRAINT `character_aspects_ibfk_1`
    FOREIGN KEY (`player_id`)
    REFERENCES `zeonaut`.`player` (`player_id`),
  CONSTRAINT `character_aspects_ibfk_2`
    FOREIGN KEY (`reference_id`)
    REFERENCES `zeonaut`.`aspect_reference` (`reference_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `zeonaut`.`character_form`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zeonaut`.`character_form` (
  `form_id` VARCHAR(12) NOT NULL,
  `player_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`form_id`),
  INDEX `player_id` (`player_id` ASC) VISIBLE,
  CONSTRAINT `character_form_ibfk_1`
    FOREIGN KEY (`player_id`)
    REFERENCES `zeonaut`.`player` (`player_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `zeonaut`.`character_source`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zeonaut`.`character_source` (
  `source_id` VARCHAR(12) NOT NULL,
  `player_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`source_id`),
  INDEX `player_id` (`player_id` ASC) VISIBLE,
  CONSTRAINT `character_source_ibfk_1`
    FOREIGN KEY (`player_id`)
    REFERENCES `zeonaut`.`player` (`player_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `zeonaut`.`form_reference`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zeonaut`.`form_reference` (
  `form_id` VARCHAR(12) NOT NULL,
  `source_id` VARCHAR(45) NULL DEFAULT NULL,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `type` VARCHAR(50) NULL DEFAULT NULL,
  `value` VARCHAR(50) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`form_id`),
  INDEX `source_id` (`source_id` ASC) VISIBLE,
  CONSTRAINT `form_reference_ibfk_1`
    FOREIGN KEY (`source_id`)
    REFERENCES `zeonaut`.`character_form` (`form_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `zeonaut`.`login_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zeonaut`.`login_info` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `zeonaut`.`scope`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zeonaut`.`scope` (
  `scope_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`scope_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `zeonaut`.`source_reference`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zeonaut`.`source_reference` (
  `reference_id` VARCHAR(12) NOT NULL,
  `source_id` VARCHAR(45) NULL DEFAULT NULL,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `type` VARCHAR(50) NULL DEFAULT NULL,
  `value` VARCHAR(50) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`reference_id`),
  INDEX `source_id` (`source_id` ASC) VISIBLE,
  CONSTRAINT `source_reference_ibfk_1`
    FOREIGN KEY (`source_id`)
    REFERENCES `zeonaut`.`character_source` (`source_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
